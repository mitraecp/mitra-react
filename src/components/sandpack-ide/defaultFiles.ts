export const defaultFiles = {
  '/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Shadcn UI Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
    hidden: true,
  },
  '/index.js': {
    code: `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";

ReactDOM.render(<App />, document.getElementById("root"));`,
    active: true,
  },
  '/App.js': {
    code: `import React, { useEffect } from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  // Apply dark theme directly
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return <Dashboard />;
}`,
  },
  '/styles.css': {
    code: `/* Base styles */
:root {
  --background: #ffffff;
  --foreground: #0f1729;
  --card: #ffffff;
  --card-foreground: #0f1729;
  --primary: #0f1729;
  --primary-foreground: #f8fafc;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f1729;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --accent: #f1f5f9;
  --accent-foreground: #0f1729;
  --destructive: #ef4444;
  --destructive-foreground: #f8fafc;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #0f1729;
  --radius: 0.5rem;
}

.dark {
  --background: #0f1729;
  --foreground: #f8fafc;
  --card: #0f1729;
  --card-foreground: #f8fafc;
  --primary: #f8fafc;
  --primary-foreground: #0f1729;
  --secondary: #1e293b;
  --secondary-foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #1e293b;
  --accent-foreground: #f8fafc;
  --destructive: #7f1d1d;
  --destructive-foreground: #f8fafc;
  --border: #1e293b;
  --input: #1e293b;
  --ring: #cbd5e1;
}

/* Apply dark theme by default */
html {
  background-color: var(--background);
  color: var(--foreground);
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
}

/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Flex utilities */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

/* Grid utilities */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\\:flex-row {
    flex-direction: row;
  }
}

/* Spacing */
.p-2 {
  padding: 0.5rem;
}

.p-6 {
  padding: 1.5rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.pt-0 {
  padding-top: 0;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

/* Typography */
.text-xs {
  font-size: 0.75rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-green-500 {
  color: #22c55e;
}

.text-muted-foreground {
  color: var(--muted-foreground);
}

/* Layout */
.min-h-screen {
  min-height: 100vh;
}

.h-16 {
  height: 4rem;
}

.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-grow {
  flex-grow: 1;
}

/* Borders */
.border {
  border: 1px solid var(--border);
}

.border-t {
  border-top: 1px solid var(--border);
}

.border-b {
  border-bottom: 1px solid var(--border);
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

/* Cards */
.card {
  background-color: var(--card);
  color: var(--card-foreground);
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
}

.button-default {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.button-default:hover {
  opacity: 0.9;
}

.button-outline {
  background-color: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
}

.button-outline:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.button-ghost {
  background-color: transparent;
  color: var(--foreground);
}

.button-ghost:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.button-sm {
  height: 2.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

/* Other utilities */
.sticky {
  position: sticky;
}

.top-0 {
  top: 0;
}

.z-10 {
  z-index: 10;
}

.bg-background {
  background-color: var(--background);
}

.bg-primary {
  background-color: var(--primary);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.space-y-1\\.5 > * + * {
  margin-top: 0.375rem;
}

.aspect-\\[4\\/3\\] {
  aspect-ratio: 4/3;
}

/* Transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}`,
  },
  '/components/ui/card.js': {
    code: `import React from "react";

const Card = ({ className, ...props }) => {
  return (
    <div
      className={\`card \${className || ""}\`}
      style={{
        padding: "1rem",
        marginBottom: "1rem"
      }}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }) => {
  return (
    <div
      className={\`flex flex-col \${className || ""}\`}
      style={{
        marginBottom: "1rem"
      }}
      {...props}
    />
  );
};

const CardTitle = ({ className, ...props }) => {
  return (
    <h3
      className={\`text-2xl font-bold \${className || ""}\`}
      style={{
        margin: "0 0 0.5rem 0"
      }}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }) => {
  return (
    <p
      className={\`text-sm text-muted-foreground \${className || ""}\`}
      style={{
        margin: "0"
      }}
      {...props}
    />
  );
};

const CardContent = ({ className, ...props }) => {
  return (
    <div
      className={\`\${className || ""}\`}
      style={{
        marginBottom: "1rem"
      }}
      {...props}
    />
  );
};

const CardFooter = ({ className, ...props }) => {
  return (
    <div
      className={\`flex items-center \${className || ""}\`}
      style={{
        marginTop: "auto"
      }}
      {...props}
    />
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };`,
  },
  '/components/ui/button.js': {
    code: `import React from "react";

const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? React.cloneElement : "button";

  // Map variant to class
  let variantClass = "button-default";
  if (variant === "outline") variantClass = "button-outline";
  if (variant === "ghost") variantClass = "button-ghost";

  // Map size to style
  let sizeStyle = {};
  if (size === "sm") {
    sizeStyle = {
      height: "2.25rem",
      padding: "0 0.75rem",
      fontSize: "0.875rem"
    };
  } else if (size === "lg") {
    sizeStyle = {
      height: "2.75rem",
      padding: "0 1.5rem",
      fontSize: "1rem"
    };
  } else {
    sizeStyle = {
      height: "2.5rem",
      padding: "0 1rem",
      fontSize: "0.875rem"
    };
  }

  return (
    <Comp
      className={\`button \${variantClass} \${className || ""}\`}
      style={{
        ...sizeStyle,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.375rem",
        fontWeight: 500,
        transition: "background-color 0.2s, color 0.2s",
        cursor: "pointer"
      }}
      {...props}
    />
  );
};

export { Button };`,
  },
  '/components/Dashboard.js': {
    code: `import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { BarChart, LineChart } from "./Charts";

export default function Dashboard() {
  const containerStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem"
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      backgroundColor: "var(--background)",
      color: "var(--foreground)"
    }}>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--background)"
      }}>
        <div style={{
          ...containerStyle,
          display: "flex",
          height: "4rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem"
        }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Shadcn UI Dashboard</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Button variant="outline" size="sm">Login</Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <div style={{
          ...containerStyle,
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem"
        }}>
          <div style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(1, 1fr)",
            "@media (min-width: 768px)": {
              gridTemplateColumns: "repeat(2, 1fr)"
            }
          }}>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart />
              </CardContent>
              <CardFooter style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outline">Download</Button>
                <Button>View Report</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>User growth over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
              <CardFooter style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outline">Download</Button>
                <Button>View Report</Button>
              </CardFooter>
            </Card>
          </div>

          <div style={{
            marginTop: "1.5rem",
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(1, 1fr)",
            "@media (min-width: 768px)": {
              gridTemplateColumns: "repeat(3, 1fr)"
            }
          }}>
            {[
              { title: "Total Users", value: "10,482", change: "+12.3%" },
              { title: "Revenue", value: "$45,239", change: "+8.2%" },
              { title: "Active Sessions", value: "1,893", change: "+4.9%" }
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader style={{ paddingBottom: "0.5rem" }}>
                  <CardTitle style={{ fontSize: "0.875rem", fontWeight: "500" }}>{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stat.value}</div>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    <span style={{ color: "#22c55e" }}>{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem"
      }}>
        <div style={{
          ...containerStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          "@media (min-width: 768px)": {
            flexDirection: "row"
          }
        }}>
          <p style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            "@media (min-width: 768px)": {
              textAlign: "left"
            }
          }}>
            &copy; {new Date().getFullYear()} Shadcn UI Dashboard. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button variant="ghost" size="sm">Terms</Button>
            <Button variant="ghost" size="sm">Privacy</Button>
            <Button variant="ghost" size="sm">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}`,
  },
  '/components/Charts.js': {
    code: `import React from "react";

export function BarChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const values = [40, 65, 50, 80, 95, 60, 70, 90, 75, 55, 45, 85];

  return (
    <div style={{ width: "100%", aspectRatio: "4/3" }}>
      <div style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "0.5rem",
          height: "100%",
          paddingBottom: "1.5rem"
        }}>
          {values.map((height, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--primary)",
                  borderRadius: "0.375rem",
                  width: "100%",
                  height: \`\${height}%\`,
                  transition: "all 0.3s ease-in-out"
                }}
              ></div>
              <span style={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.75rem",
                color: "var(--muted-foreground)"
              }}>
                {months[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LineChart() {
  // SVG path for a simple line chart
  const points = [
    [0, 80],
    [100, 60],
    [200, 75],
    [300, 40],
    [400, 50],
    [500, 25],
    [600, 30],
  ];

  const maxY = 100;
  const minY = 0;
  const width = 600;
  const height = 200;

  // Convert points to SVG path
  const pathData = points.map((point, i) => {
    const x = point[0];
    // Invert Y axis since SVG has 0,0 at top-left
    const y = height - ((point[1] - minY) / (maxY - minY) * height);
    return \`\${i === 0 ? 'M' : 'L'} \${x} \${y}\`;
  }).join(' ');

  return (
    <div style={{
      width: "100%",
      aspectRatio: "4/3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <svg width="100%" height="100%" viewBox={\`0 0 \${width} \${height}\`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((tick, i) => {
          const y = height - (tick / maxY * height);
          return (
            <React.Fragment key={i}>
              <line
                x1="0"
                y1={y}
                x2={width}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
              <text
                x="5"
                y={y - 5}
                fontSize="10"
                fill="currentColor"
                fillOpacity="0.6"
              >
                {tick}%
              </text>
            </React.Fragment>
          );
        })}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={height - ((point[1] - minY) / (maxY - minY) * height)}
            r="4"
            fill="currentColor"
          />
        ))}
      </svg>
    </div>
  );
}`,
  },
  '/package.json': {
    code: `{
  "name": "shadcn-ui-dashboard",
  "version": "1.0.0",
  "description": "Dashboard example with Shadcn UI and Tailwind CSS",
  "main": "index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
    hidden: true,
  },
};
