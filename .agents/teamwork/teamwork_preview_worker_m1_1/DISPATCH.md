# Dispatch: M1 Worker (Implementation)

- Role: Foundation, Design Tokens & Layout Implementer
- Archetype: teamwork_preview_worker
- Working Directory: /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_worker_m1_1
- Target Project Root: /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded
- Milestone: Milestone 1 - Foundation, Design Tokens, Layout & Styled Placeholders

## Inputs & Specifications to Read:
1. /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/ORIGINAL_REQUEST.md
2. /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/PROJECT.md
3. /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_m1_1/handoff.md
4. /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_m1_2/handoff.md
5. /home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_explorer_m1_3/handoff.md

## Scope & File Ownership
You exclusively own and will create/modify:
- User-space Node 20 LTS installation (unpacking node-v20.18.0-linux-x64.tar.xz into ~/.local, symlinking into ~/.gemini/antigravity/bin)
- `package.json` & running `npm install`
- `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `.eslintrc.json`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx` (initial shell showcasing layout, placeholders, and palette)
- `src/components/common/StyledPlaceholder.tsx` (all 5 SVG motifs: olive grove, Jordan Valley terraces, ancient terroir, plated gourmet cloche, chef portrait)
- `src/components/common/Badge.tsx`
- `src/components/common/Navbar.tsx`
- `src/components/common/Footer.tsx`
- `src/lib/utils.ts`
- `public/favicon.svg` (or favicon.ico)

## Required Verification
1. Run `npm run build` and ensure exit code 0 with 0 errors.
2. Verify zero external/stock image URLs are loaded.
3. Document all commands executed and results in your handoff report:
   `/home/blackcrow/.gemini/antigravity/scratch/CGH-vibecoded/.agents/teamwork/teamwork_preview_worker_m1_1/handoff.md`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
