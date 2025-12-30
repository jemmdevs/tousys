"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./NeuralNoiseBackground.module.css";

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

// Fragment Shader
const fragmentShaderSource = `
precision mediump float;

varying vec2 vUv;
uniform float u_time;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_scroll_progress;

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
    
    // Enhanced vignette effect - elliptical fade for better edge blending
    vec2 vignetteCenter = vUv - vec2(0.5, 0.45); // Slightly offset center upward
    vignetteCenter.x *= 1.3; // Wider horizontal fade
    vignetteCenter.y *= 1.5; // Stronger vertical fade (for navbar/section transitions)
    float vignetteDist = length(vignetteCenter);
    
    // Smooth falloff: starts fading at 0.3, fully transparent at 0.7
    float vignette = 1.0 - smoothstep(0.25, 0.6, vignetteDist);
    vignette = pow(vignette, 1.5); // Softer falloff curve
    
    noise *= vignette;

    color = normalize(vec3(.2, .5 + .4 * cos(3. * u_scroll_progress), .5 + .5 * sin(3. * u_scroll_progress)));

    color = color * noise;

    // Apply vignette to alpha as well for complete fade
    float alpha = noise * vignette;

    gl_FragColor = vec4(color, alpha);
}
`;


interface Uniforms {
    u_time: WebGLUniformLocation | null;
    u_ratio: WebGLUniformLocation | null;
    u_pointer_position: WebGLUniformLocation | null;
    u_scroll_progress: WebGLUniformLocation | null;
}

export default function NeuralNoiseBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);
    const uniformsRef = useRef<Uniforms | null>(null);
    const animationRef = useRef<number>(0);
    const pointerRef = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
    const isVisibleRef = useRef(true);

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

        // Get uniforms
        const uniforms: Uniforms = {
            u_time: gl.getUniformLocation(program, "u_time"),
            u_ratio: gl.getUniformLocation(program, "u_ratio"),
            u_pointer_position: gl.getUniformLocation(program, "u_pointer_position"),
            u_scroll_progress: gl.getUniformLocation(program, "u_scroll_progress"),
        };

        // Setup vertices (full screen quad)
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
    }, [createShader]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const gl = glRef.current;
        const uniforms = uniformsRef.current;

        if (!canvas || !gl || !uniforms) return;

        // Reduced pixel ratio for performance (1.0 is visually sufficient for shader noise effects)
        const devicePixelRatio = Math.min(window.devicePixelRatio, 1.0);
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;

        gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }, []);

    const render = useCallback(() => {
        // Completely skip if not visible - don't even schedule next frame
        if (!isVisibleRef.current) {
            return;
        }

        const gl = glRef.current;
        const uniforms = uniformsRef.current;
        const pointer = pointerRef.current;

        if (!gl || !uniforms) return;

        const currentTime = performance.now();

        // Smooth pointer interpolation
        pointer.x += (pointer.tX - pointer.x) * 0.2;
        pointer.y += (pointer.tY - pointer.y) * 0.2;

        gl.uniform1f(uniforms.u_time, currentTime);
        gl.uniform2f(
            uniforms.u_pointer_position,
            pointer.x / window.innerWidth,
            1 - pointer.y / window.innerHeight
        );
        gl.uniform1f(uniforms.u_scroll_progress, window.pageYOffset / (2 * window.innerHeight));

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationRef.current = requestAnimationFrame(render);
    }, []);

    const updateMousePosition = useCallback((x: number, y: number) => {
        pointerRef.current.tX = x;
        pointerRef.current.tY = y;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize WebGL
        const gl = initShader(canvas);
        if (!gl) return;

        glRef.current = gl;

        // Initial resize
        resizeCanvas();

        // Start render loop
        render();

        // Event handlers
        const handlePointerMove = (e: PointerEvent) => {
            updateMousePosition(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.targetTouches[0]) {
                updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            }
        };

        const handleClick = (e: MouseEvent) => {
            updateMousePosition(e.clientX, e.clientY);
        };

        // Visibility detection for performance - completely stop rendering when off-screen
        const visibilityObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const wasVisible = isVisibleRef.current;
                    isVisibleRef.current = entry.isIntersecting;

                    // Restart render loop when becoming visible again
                    if (!wasVisible && entry.isIntersecting) {
                        animationRef.current = requestAnimationFrame(render);
                    }
                });
            },
            { threshold: 0, rootMargin: '100px' }
        );
        visibilityObserver.observe(canvas);

        // Add event listeners
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("click", handleClick);

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            visibilityObserver.disconnect();
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("click", handleClick);
        };
    }, [initShader, resizeCanvas, render, updateMousePosition]);

    return <canvas ref={canvasRef} className={styles.neuroCanvas} id="neuro" />;
}
