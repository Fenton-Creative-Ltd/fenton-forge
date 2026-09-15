const fs = require('fs');

const filePath = 'categories/voluntary-organisation/index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Add tooltip CSS before </head>
const tooltipCSS = `
    <style>
        [data-tooltip] {
            position: relative;
            cursor: help;
            border-bottom: 1px dotted var(--accent);
        }
        [data-tooltip]::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 0;
            background: var(--surface);
            color: var(--text);
            padding: 0.75rem;
            border-radius: 8px;
            font-size: 0.85rem;
            width: 250px;
            z-index: 100;
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s;
            border: 1px solid var(--accent);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            line-height: 1.4;
        }
        [data-tooltip]:hover::after {
            opacity: 1;
            visibility: visible;
            bottom: calc(100% + 8px);
        }
    </style>
`;

content = content.replace('</head>', tooltipCSS + '</head>');

// Replace qualifications with tooltip versions
const oldQualifications = `<ul class="criteria">
            <li>✓ Registered charities (England, Wales, Scotland, NI)</li>
            <li>✓ Social enterprises with asset lock</li>
            <li>✓ Community groups with formal structure</li>
            <li>✓ Annual turnover under £500,000</li>
            <li>✓ UK-based operations</li>
        </ul>`;

const newQualifications = `<ul class="criteria">
            <li data-tooltip="Must be registered with Charity Commission or OSCR. Includes all sizes from small local charities to national organisations.">✓ Registered charities (England, Wales, Scotland, NI)</li>
            <li data-tooltip="Community Interest Companies (CICs) and other social enterprises with asset lock provisions. Must have governing documents showing asset lock.">✓ Social enterprises with asset lock</li>
            <li data-tooltip="Community groups, clubs, and associations with formal governance structure (constitution, committee, etc). Informal groups don't qualify.">✓ Community groups with formal structure</li>
            <li data-tooltip="ONLY for voluntary organisations: Maximum annual turnover of £500,000. This includes all income: donations, grants, trading income, and investments.">✓ <strong>Voluntary organisations only:</strong> Annual turnover under £500,000</li>
            <li data-tooltip="Organisation must be based in and primarily operating in the UK. International charities with UK presence may qualify if UK operations are separate.">✓ UK-based operations</li>
        </ul>`;

content = content.replace(oldQualifications, newQualifications);

fs.writeFileSync(filePath, content);
console.log('✓ Tooltips added to Voluntary Organisations page');
