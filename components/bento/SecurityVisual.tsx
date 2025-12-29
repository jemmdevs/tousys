"use client";

import styles from "./SecurityVisual.module.css";

interface InputFieldProps {
    value: string;
    isBlurred?: boolean;
    alignRight?: boolean;
    isHovered?: boolean;
}

function InputField({ value, isBlurred, alignRight, isHovered }: InputFieldProps) {
    const classNames = [
        styles.input,
        isBlurred ? styles.blurred : "",
        alignRight ? styles.inputRight : "",
        isBlurred && isHovered ? styles.blurredHovered : ""
    ].filter(Boolean).join(" ");

    return (
        <div className={classNames}>
            <span>{value}</span>
        </div>
    );
}

interface SecurityVisualProps {
    isHovered?: boolean;
}

export default function SecurityVisual({ isHovered = false }: SecurityVisualProps) {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Row 1: Normal */}
                <InputField value="b160198@gmail.com" />
                <InputField value="alex16019356788" alignRight />
                {/* Row 2: Blurred */}
                <InputField value="• • • • • • • • • •" isBlurred isHovered={isHovered} />
                <InputField value="• • • • • • • • • •" isBlurred alignRight isHovered={isHovered} />
                {/* Row 3: Normal */}
                <InputField value="x234567@gmail.com" />
                <InputField value="mememaster000" alignRight />
            </div>
        </div>
    );
}
