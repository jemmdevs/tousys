"use client";

import { memo } from "react";
import styles from "./CloudStorageVisual.module.css";

interface CloudStorageVisualProps {
    isHovered?: boolean;
}

function CloudStorageVisual({ isHovered = false }: CloudStorageVisualProps) {
    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            <div className={styles.stack}>
                {/* Carpeta trasera */}
                <div className={`${styles.folder} ${styles.folderBack}`}>
                    <div className={styles.folderTab}></div>
                    <div className={styles.folderBody}>
                        <span className={styles.folderLabel}>Projects</span>
                    </div>
                </div>

                {/* Carpeta media */}
                <div className={`${styles.folder} ${styles.folderMiddle}`}>
                    <div className={styles.folderTab}></div>
                    <div className={styles.folderBody}>
                        <span className={styles.folderLabel}>Sequences</span>
                    </div>
                </div>

                {/* Carpeta frontal */}
                <div className={`${styles.folder} ${styles.folderFront}`}>
                    <div className={styles.folderTab}></div>
                    <div className={styles.folderBody}>
                        <span className={styles.folderLabel}>Analysis</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CloudStorageVisual);
