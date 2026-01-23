import Link from "next/link";
import Navbar from "@/components/Navbar";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "Documentation | Al-Awal",
    description: "Complete documentation for Al-Awal codon optimization platform.",
};

export default function DocsPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* Header */}
                <h1 className={styles.pageTitle}>Al-Awal Documentation</h1>
                <p className={styles.pageSubtitle}>
                    Welcome to Al-Awal, the advanced mRNA codon optimization platform.
                    This documentation will help you get the most out of our tools.
                </p>

                {/* ═══════════════════════════════════════════════════════════
                    QUICK START
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Quick Start</h2>

                    <h3 className={styles.heading}>1. Request Access</h3>
                    <p>
                        <Link href="/contact?tab=getaccess" className={styles.link}>Contact us</Link> to request access to the Al-Awal platform.
                        Once approved, you will receive your credentials to log in.
                    </p>

                    <h3 className={styles.heading}>2. Load Your Sequence</h3>
                    <p>Three ways to input your DNA sequence:</p>
                    <ul className={styles.list}>
                        <li><strong>Manual entry:</strong> Paste directly into the sequence editor</li>
                        <li><strong>FASTA upload:</strong> Click "Upload" to load .fasta, .fa, or .fna files</li>
                        <li><strong>Sample sequences:</strong> Use built-in examples (Insulin B, GFP) to explore</li>
                    </ul>

                    <h3 className={styles.heading}>3. Run Analysis</h3>
                    <p>Click "Analyze & Visualize" to generate the codon map with pause scores.</p>

                    <h3 className={styles.heading}>4. Optimize</h3>
                    <p>Use "Auto-Optimize All" for full sequence optimization, or click individual codons for targeted adjustments.</p>

                    <h3 className={styles.heading}>5. Export Results</h3>
                    <p>Download your optimized sequence in FASTA, TXT, JSON, or CSV format.</p>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    CORE CONCEPTS
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Core Concepts</h2>

                    <h3 className={styles.heading}>Pause Score</h3>
                    <p>
                        The pause score (measured in milliseconds) represents the predicted time a ribosome
                        pauses at each codon during translation. Lower scores indicate faster translation.
                    </p>

                    <h3 className={styles.heading}>DAIS (Dynamic Assurance Indexing of Sequence)</h3>
                    <p>Our proprietary quality index that evaluates overall sequence optimization:</p>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Category</th>
                                <th>Meaning</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>≥ 85%</td>
                                <td>Good</td>
                                <td>Well-optimized, minimal bottlenecks</td>
                            </tr>
                            <tr>
                                <td>≥ 70%</td>
                                <td>Moderate</td>
                                <td>Some improvement possible</td>
                            </tr>
                            <tr>
                                <td>&lt; 70%</td>
                                <td>Critical</td>
                                <td>Significant optimization recommended</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className={styles.heading}>Optimization Models</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Description</th>
                                <th>Best For</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Complete (LGRK + tRNA)</td>
                                <td>Combines local ribosomal kinetics with tRNA availability</td>
                                <td>Most use cases</td>
                            </tr>
                            <tr>
                                <td>LGRK Only</td>
                                <td>Local geometric ribosomal kinetics only</td>
                                <td>Structural analysis</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className={styles.heading}>Supported Organisms</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Organism</th>
                                <th>Correlation</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>E. coli</td>
                                <td>r ≈ 0.98</td>
                                <td>Highest accuracy</td>
                            </tr>
                            <tr>
                                <td>Human</td>
                                <td>r ≈ 0.96</td>
                                <td>Mammalian expression</td>
                            </tr>
                            <tr>
                                <td>Yeast</td>
                                <td>r ≈ 0.80</td>
                                <td>Eukaryotic model</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    SEQUENCE EDITOR
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Sequence Editor</h2>

                    <h3 className={styles.heading}>Input Validation</h3>
                    <p>The platform automatically validates your sequence:</p>
                    <ul className={styles.list}>
                        <li><strong>✓ Start codon:</strong> Must begin with ATG</li>
                        <li><strong>✓ Stop codon:</strong> Must end with TAA, TAG, or TGA</li>
                        <li><strong>✓ Reading frame:</strong> Length must be divisible by 3</li>
                        <li><strong>GC Content:</strong> Displayed as percentage</li>
                    </ul>

                    <h3 className={styles.heading}>Accepted Characters</h3>
                    <p>Only A, G, T, C nucleotides are accepted. Other characters are automatically filtered.</p>

                    <h3 className={styles.heading}>Canvas Navigation</h3>
                    <ul className={styles.list}>
                        <li><strong>Pan:</strong> Click and drag on empty canvas</li>
                        <li><strong>Zoom:</strong> Mouse scroll or pinch gesture</li>
                        <li><strong>Select codon:</strong> Click on any codon node</li>
                        <li><strong>Multi-select:</strong> Shift + click</li>
                    </ul>

                    <h3 className={styles.heading}>Codon Visualization</h3>
                    <p>Each codon is displayed as an interactive node showing:</p>
                    <ul className={styles.list}>
                        <li>Position number (#1, #2, #3...)</li>
                        <li>Amino acid (single letter code)</li>
                        <li>Codon triplet (e.g., ATG, GCA)</li>
                        <li>Pause score (in milliseconds)</li>
                    </ul>

                    <h3 className={styles.heading}>Color Coding</h3>
                    <p>Codons are colored based on their pause score:</p>
                    <ul className={styles.list}>
                        <li><span className={styles.colorGreen}>●</span> <strong>Green:</strong> Fast translation (low pause)</li>
                        <li><span className={styles.colorYellow}>●</span> <strong>Yellow:</strong> Moderate pause</li>
                        <li><span className={styles.colorRed}>●</span> <strong>Red:</strong> Slow translation (high pause - optimization target)</li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    OPTIMIZATION
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Optimization</h2>

                    <h3 className={styles.heading}>Auto-Optimize All</h3>
                    <p>Optimizes the entire sequence in one click using the selected model and organism settings.</p>
                    <p><strong>Requirements:</strong></p>
                    <ul className={styles.list}>
                        <li>Must be logged in</li>
                        <li>Sequence must pass validation</li>
                    </ul>

                    <h3 className={styles.heading}>Single Codon Optimization</h3>
                    <p>Click any codon to see:</p>
                    <ul className={styles.list}>
                        <li>Current pause score</li>
                        <li>Alternative codon suggestions</li>
                        <li>Improvement percentage for each option</li>
                        <li>AI recommendation</li>
                    </ul>
                    <p className={styles.note}>
                        <strong>Note:</strong> Only synonymous codons are suggested (same amino acid, different nucleotides).
                    </p>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    3D VISUALIZATION
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3D Visualization</h2>

                    <h3 className={styles.heading}>Protein Structure Prediction</h3>
                    <p>Generate predicted 3D protein structure using ESMFold technology.</p>
                    <p><strong>To use:</strong></p>
                    <ol className={styles.orderedList}>
                        <li>Load your sequence</li>
                        <li>Go to Tools → 3D Structure</li>
                        <li>Wait for folding prediction (~10-30 seconds)</li>
                    </ol>

                    <h3 className={styles.heading}>Heatmap Overlay</h3>
                    <p>Pause scores are mapped onto the 3D structure:</p>
                    <ul className={styles.list}>
                        <li><span className={styles.colorGreen}>●</span> <strong>Green regions:</strong> Fast translation</li>
                        <li><span className={styles.colorRed}>●</span> <strong>Red regions:</strong> Ribosomal pause zones</li>
                    </ul>

                    <h3 className={styles.heading}>Critical Residue Labels</h3>
                    <p>Residues in the top 5% of pause scores are labeled with:</p>
                    <ul className={styles.list}>
                        <li>Amino acid and position</li>
                        <li>Codon triplet</li>
                        <li>Pause time in milliseconds</li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    KINETICS CHART
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Kinetics Chart</h2>
                    <p>The kinetics chart displays pause scores for all codons as an interactive bar graph.</p>

                    <h3 className={styles.heading}>Features</h3>
                    <ul className={styles.list}>
                        <li><strong>Horizontal scroll:</strong> Navigate long sequences</li>
                        <li><strong>Hover tooltips:</strong> See detailed codon information</li>
                        <li><strong>Critical peaks:</strong> Marked in red with warning indicators</li>
                        <li><strong>Click to select:</strong> Clicking a bar selects that codon on the canvas</li>
                    </ul>

                    <h3 className={styles.heading}>AI Peak Analysis</h3>
                    <p>Click "Analyze Peaks" for AI-powered insights on:</p>
                    <ul className={styles.list}>
                        <li>Why certain positions have high pause scores</li>
                        <li>Recommendations for optimization</li>
                        <li>Potential impact on protein folding</li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    MUTATION COMPARISON
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Mutation Comparison</h2>
                    <p>Compare kinetic profiles between two sequences:</p>
                    <ol className={styles.orderedList}>
                        <li>Go to Mutation Analysis tab</li>
                        <li>Paste your Wild-Type sequence</li>
                        <li>Paste your Mutant sequence</li>
                        <li>Click "Compare Impact"</li>
                    </ol>
                    <p>The tool identifies:</p>
                    <ul className={styles.list}>
                        <li>Position of mutations</li>
                        <li>Change in pause scores</li>
                        <li>Predicted effect on translation efficiency</li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    REPORTS & EXPORT
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Reports & Export</h2>

                    <h3 className={styles.heading}>Optimization Report</h3>
                    <p>After optimization, generate a detailed report showing:</p>
                    <ul className={styles.list}>
                        <li>Before/after comparison charts</li>
                        <li>Performance gain percentage</li>
                        <li>Critical pauses fixed count</li>
                        <li>Estimated expression improvement</li>
                        <li>Total time saved (milliseconds)</li>
                    </ul>

                    <h3 className={styles.heading}>Export Formats</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Format</th>
                                <th>Extension</th>
                                <th>Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>FASTA</td>
                                <td>.fa</td>
                                <td>Standard bioinformatics tools</td>
                            </tr>
                            <tr>
                                <td>Plain Text</td>
                                <td>.txt</td>
                                <td>Simple sequence with metadata</td>
                            </tr>
                            <tr>
                                <td>JSON</td>
                                <td>.json</td>
                                <td>Complete technical report, API integration</td>
                            </tr>
                            <tr>
                                <td>CSV</td>
                                <td>.csv</td>
                                <td>Spreadsheet analysis, data processing</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    PROJECT MANAGEMENT
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Project Management</h2>

                    <h3 className={styles.heading}>Save Projects</h3>
                    <ul className={styles.list}>
                        <li>Click Save to store your project in the cloud</li>
                        <li>Projects include: sequence, all codons, notes, and layout</li>
                    </ul>

                    <h3 className={styles.heading}>Load Projects</h3>
                    <ul className={styles.list}>
                        <li>Click Load to see your saved projects</li>
                        <li>Projects show name and last modified date</li>
                    </ul>

                    <h3 className={styles.heading}>Save As</h3>
                    <p>Create a copy of your current project with a new name</p>

                    <h3 className={styles.heading}>Undo/Redo</h3>
                    <ul className={styles.list}>
                        <li>Supports up to 20 levels of undo</li>
                        <li>Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Shift+Z (redo)</li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    NOTES
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Notes</h2>
                    <p>Add annotations to your sequence:</p>
                    <ol className={styles.orderedList}>
                        <li>Click "Add Note" in the Tools section</li>
                        <li>Position the note on the canvas</li>
                        <li>Connect it to any codon using the bottom handle</li>
                        <li>Double-click to edit text</li>
                    </ol>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    KEYBOARD SHORTCUTS
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Keyboard Shortcuts</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Shortcut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Undo</td><td>Ctrl + Z</td></tr>
                            <tr><td>Redo</td><td>Ctrl + Shift + Z</td></tr>
                            <tr><td>Save</td><td>Ctrl + S</td></tr>
                            <tr><td>Zoom In</td><td>Ctrl + Plus</td></tr>
                            <tr><td>Zoom Out</td><td>Ctrl + Minus</td></tr>
                            <tr><td>Fit View</td><td>Ctrl + 0</td></tr>
                        </tbody>
                    </table>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    TROUBLESHOOTING
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Troubleshooting</h2>

                    <h3 className={styles.heading}>Sequence Not Loading</h3>
                    <ul className={styles.list}>
                        <li>Ensure only A, G, T, C characters are present</li>
                        <li>Check that sequence length is divisible by 3</li>
                        <li>Verify file format for FASTA uploads</li>
                    </ul>

                    <h3 className={styles.heading}>3D Structure Not Rendering</h3>
                    <ul className={styles.list}>
                        <li>Structure prediction requires a valid protein-coding sequence</li>
                        <li>Very short sequences (&lt;30 codons) may not fold properly</li>
                        <li>Try refreshing if the viewer appears blank</li>
                    </ul>

                    <h3 className={styles.heading}>Optimization Not Available</h3>
                    <ul className={styles.list}>
                        <li>Ensure you are logged in with approved credentials</li>
                        <li>Check that sequence passes all validation checks</li>
                        <li>Contact support if you experience access issues</li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ═══════════════════════════════════════════════════════════
                    CONTACT & SUPPORT
                ═══════════════════════════════════════════════════════════ */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact & Support</h2>
                    <p>
                        Email: <a href="mailto:Servicio@tousysbiotech.com" className={styles.link}>Servicio@tousysbiotech.com</a>
                    </p>
                    <p className={styles.lastUpdated}>Last updated: January 2026</p>
                </section>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
