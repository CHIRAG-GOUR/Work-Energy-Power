const fs = require('fs');
const ch = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = ch.load(html);

// Utility to convert DOM to JSX string
function domToJSX(el) {
    if (el.type === 'text') {
        const text = el.data || '';
        // Only keep if it has non-whitespace
        if (!text.trim()) return '';
        // Escape braces for jsx
        return text.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
    }
    
    if (el.type !== 'tag') return '';
    
    const tag = el.name;
    let attrsStr = '';
    
    for (let attr in el.attribs) {
        let val = el.attribs[attr];
        // Rename common attrs
        if (attr === 'class') attr = 'className';
        if (attr === 'for') attr = 'htmlFor';
        if (attr === 'stroke-width') attr = 'strokeWidth';
        if (attr === 'stroke-dasharray') attr = 'strokeDasharray';
        if (attr === 'stroke-dashoffset') attr = 'strokeDashoffset';
        if (attr === 'transform-origin') attr = 'transformOrigin';
        if (attr === 'stroke-linecap') attr = 'strokeLinecap';
        if (attr === 'stroke-linejoin') attr = 'strokeLinejoin';
        if (attr === 'allowfullscreen') { attrsStr += ` allowFullScreen`; continue; }
        if (attr === 'frameborder') attr = 'frameBorder';

        if (attr === 'style') {
            const rules = val.split(';').filter(r => r.trim());
            const styles = rules.map(rule => {
                let [k, ...v] = rule.split(':');
                if(!k) return '';
                let key = k.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                let value = v.join(':').trim().replace(/'/g, "\\'");
                return `${key}: '${value}'`;
            }).filter(Boolean).join(', ');
            attrsStr += ` style={{ ${styles} }}`;
            continue;
        }
        
        attrsStr += ` ${attr}="${val.replace(/"/g, '&quot;')}"`;
    }

    const selfClosing = ['img', 'hr', 'br', 'input', 'source', 'path', 'circle', 'iframe'].includes(tag);
    
    let innerJSX = '';
    if (el.children) {
        innerJSX = el.children.map(domToJSX).join('');
    }

    if (selfClosing && !innerJSX) {
        return `<${tag}${attrsStr} />`;
    }
    
    if (tag === 'iframe') {
         // react requires iframes to not have children if they are void
         return `<${tag}${attrsStr} />`;
    }

    return `<${tag}${attrsStr}>${innerJSX}</${tag}>`;
}

// Extract Chapters
const views = $('.route-view').toArray();
const chap1HTML = domToJSX(views[0]);
const chap2HTML = domToJSX(views[1]);

fs.mkdirSync('src/pages', { recursive: true });

fs.writeFileSync('src/pages/ChapterOneOne.jsx', `
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChapterOneOne() {
    const navigate = useNavigate();
    return (
        <div className="route-view" id="view-chapter-1.1">
            ${chap1HTML}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="nav-btn btn-primary" onClick={() => navigate('/1.2')}>Next: Chapter 1.2</button>
            </div>
        </div>
    );
}
`);

fs.writeFileSync('src/pages/ChapterOneTwo.jsx', `
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initSim1, initSim2, cleanupSim1, cleanupSim2 } from '../lib/simulations';

export default function ChapterOneTwo() {
    const navigate = useNavigate();

    useEffect(() => {
        // We delay init slightly to ensure canvas is painted
        const timer = setTimeout(() => {
            initSim1();
            initSim2();
        }, 100);
        return () => {
            clearTimeout(timer);
            cleanupSim1();
            cleanupSim2();
        };
    }, []);

    return (
        <div className="route-view" id="view-chapter-1.2">
            ${chap2HTML}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="nav-btn" onClick={() => navigate('/1.1')}>Back to Chapter 1.1</button>
            </div>
        </div>
    );
}
`);

console.log('JSX Pages generated successfully.');
