"use client";

import { memo } from "react";
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

function SecurityVisual({ isHovered = false }: SecurityVisualProps) {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Row 1: Normal */}
                <InputField value="wearetousys@gmail.com" />
                <InputField value="alawal16019356788" alignRight />
                {/* Row 2: Blurred */}
                <InputField value="• • • • • • • • • •" isBlurred isHovered={isHovered} />
                <InputField value="• • • • • • • • • •" isBlurred alignRight isHovered={isHovered} />
                {/* Row 3: Normal */}
                <InputField value="ikraOS@gmail.com" />
                <InputField value="weareengineers000" alignRight />
            </div>
        </div>
    );
}

export default memo(SecurityVisual);
