import glob

models = ['ada', 'aisha', 'anastasia', 'becky', 'belle', 'debby', 'ruth']
for m in models:
    fpath = rf"c:\Users\Dell\OneDrive\Desktop\Beige\models\{m}\index.html"
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()
    new_lines = []
    for line in lines:
        if ('<meta name="description"' in line or '<meta property="og:description"' in line or '<meta name="twitter:description"' in line):
            # Replace internal unescaped inches quotes like 5'10" with 5'10 in.
            line = line.replace("5'10\"", "5'10 in.").replace("5'11\"", "5'11 in.").replace("5'9\"", "5'9 in.").replace("5'9.5\"", "5'9.5 in.").replace("5'8.5\"", "5'8.5 in.")
        new_lines.append(line)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write("\n".join(new_lines))
    print(f"Sanitized meta tags in {m}")

print("Done sanitizing meta tags!")
