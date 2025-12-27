"use client";

import { useEffect, useRef, useCallback } from "react";

// Vertex Shader
const vertexShaderSource = `
precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Fragment Shader - simplified for cards with color support
const getFragmentShaderSource = (r: number, g: number, b: number) => `
precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;

vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;

    for (int j = 0; j < 15; j++) {
        uv = rotate(uv, 1.);
        sine_acc = rotate(sine_acc, 1.);
        vec2 layer = uv * scale + float(j) + sine_acc - t;
        sine_acc += sin(layer) + 2.4 * p;
        res += (.5 + .5 * cos(layer)) / scale;
        scale *= (1.2);
    }
    return res.x + res.y;
}

void main() {
    vec2 uv = .5 * vUv;
    uv.x *= u_ratio;

    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0., 1.);
    p = .5 * pow(1. - p, 2.);

    float t = .001 * u_time;
    vec3 color = vec3(0.);

    float noise = neuro_shape(uv, t, p);

    noise = 1.2 * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - .5);

    color = normalize(vec3(${r.toFixed(1)}, ${g.toFixed(1)}, ${b.toFixed(1)}));
    color = color * noise;

    gl_FragColor = vec4(color, noise);
}
`;

interface CardNeuralNoiseProps {
    className?: string;
    color?: 'cyan' | 'red';
}

export default function CardNeuralNoise({ className, color = 'cyan' }: CardNeuralNoiseProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const uniformsRef = useRef<{
        u_time: WebGLUniformLocation | null;
        u_ratio: WebGLUniformLocation | null;
        u_pointer_position: WebGLUniformLocation | null;
    } | null>(null);
    const animationRef = useRef<number>(0);
    const pointerRef = useRef({ x: 0.5, y: 0.5, tX: 0.5, tY: 0.5 });

    const createShader = useCallback((gl: WebGLRenderingContext, sourceCode: string, type: number) => {
        const shader = gl.createShader(type);
        if (!shader) return null;

        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }, []);

    const initShader = useCallback((canvas: HTMLCanvasElement) => {
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext;

        if (!gl) {
            console.error("WebGL is not supported");
            return null;
        }

        // Definir colores según el prop
        const colorValues = color === 'red' ? { r: 0.8, g: 0.2, b: 0.1 } : { r: 0.2, g: 0.5, b: 0.5 };
        const fragmentShaderSource = getFragmentShaderSource(colorValues.r, colorValues.g, colorValues.b);

        const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) return null;

        const program = gl.createProgram();
        if (!program) return null;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            return null;
        }

        const uniforms = {
            u_time: gl.getUniformLocation(program, "u_time"),
            u_ratio: gl.getUniformLocation(program, "u_ratio"),
            u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
        };

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        gl.useProgram(program);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        uniformsRef.current = uniforms;
        return gl;
    }, [createShader, color]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const gl = glRef.current;
        const uniforms = uniformsRef.current;

        if (!canvas || !container || !gl || !uniforms) return;

        const rect = container.getBoundingClientRect();
        const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;

        gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }, []);

    const render = useCallback(() => {
        const gl = glRef.current;
        const uniforms = uniformsRef.current;
        const pointer = pointerRef.current;

        if (!gl || !uniforms) return;

        const currentTime = performance.now();

        pointer.x += (pointer.tX - pointer.x) * 0.1;
        pointer.y += (pointer.tY - pointer.y) * 0.1;

        gl.uniform1f(uniforms.u_time, currentTime);
        gl.uniform2f(uniforms.u_pointer_position, pointer.x, pointer.y);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationRef.current = requestAnimationFrame(render);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = initShader(canvas);
        if (!gl) return;

        glRef.current = gl;
        resizeCanvas();
        render();

        const handleResize = () => resizeCanvas();
        window.addEventListener("resize", handleResize);

        const handlePointerMove = (e: PointerEvent) => {
            const container = containerRef.current;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            pointerRef.current.tX = (e.clientX - rect.left) / rect.width;
            pointerRef.current.tY = 1 - (e.clientY - rect.top) / rect.height;
        };

        window.addEventListener("pointermove", handlePointerMove);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [initShader, resizeCanvas, render]);

    return (
        <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0 }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}
