/**
 * Best-effort install-time license notice for @taprootio/espalier.
 *
 * Printed on `npm install`. It never fails the install, takes no action, and is
 * skipped wherever install scripts are disabled (for example
 * `npm install --ignore-scripts`). It is notice only — using the package is not
 * contingent on it running.
 */
/* global process */
try {
  const rule = "-".repeat(68);
  process.stdout.write(
    [
      "",
      rule,
      "  @taprootio/espalier is proprietary software — not open source.",
      "",
      "  A public npm install grants a 30-day Evaluation license only.",
      "  Production use requires a paid Order Form.",
      "",
      "  Full terms:          the bundled LICENSE file",
      "  Third-party notices: the bundled licenses/ directory",
      "  Licensing:           legal@taproot.io",
      rule,
      "",
    ].join("\n") + "\n",
  );
} catch {
  // A notice must never block installation.
}
