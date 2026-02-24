# GLPGrub Content Authoring

Articles live in `content/articles/*.md`.

## Callouts (nice boxes)
Write GitHub-style callouts like this:

```md
> [!TIP] Protein-first rule
> Start every meal with a few bites of protein.
> It’s the easiest way to hit your goal with a smaller appetite.

> [!NOTE] Hydration
> If nausea is worse, try electrolytes + small sips all day.

> [!WARNING] If you can’t keep fluids down
> Call your clinician—dehydration hits fast on GLP-1s.
```

Supported types: `TIP`, `NOTE`, `WARNING`.

## Recipes
Add recipe frontmatter:

```yaml
---
title: "Greek yogurt protein bowl"
excerpt: "High-protein, low-effort breakfast for low appetite mornings"
date: "2026-02-23"
category: "Recipes"
readTime: "4 min read"
type: recipe
servings: "1"
prepTime: "5 min"
protein: "35g"
calories: "420"
---
```

It will appear on `/recipes`.
