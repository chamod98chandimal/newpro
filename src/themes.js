// Original starter designs and artwork. No WordPress theme code or assets are used.
const media = name => new URL(`media/${name}.svg`, typeof document === 'undefined' ? 'https://chamod98chandimal.github.io/newpro/' : document.baseURI).href;
const block = (type, overrides = {}) => ({ type, eyebrow: '', title: '', body: '', align: 'left', padding: 'medium', ...overrides });
const column = (id, children) => ({ id, children });
const imageBox = (src, title, body, url = '#') => block('imageBox', { src: media(src), alt: title, title, body, button: 'Explore the story', url });

export const themes = {
  atelier: {
    name: 'Atelier Living', siteName: 'ATELIER', label: 'Considered spaces. Everyday beauty.', intro: 'An editorial lifestyle theme for studios, interiors, and thoughtful brands.',
    accent: '#9b7653', background: '#ffffff', font: 'serif', theme: 'atelier', poster: media('interior'),
    sections: [
      block('slider', { items: [
        { src: media('interior'), title: 'A quieter kind of beautiful.', body: 'Considered spaces. Honest materials. A little more room for the things that matter.', button: 'Explore our world', url: '#section-2' },
        { src: media('architecture'), title: 'Made to feel like home.', body: 'Discover the people, places, and objects shaping a more thoughtful everyday.', button: 'Find your inspiration', url: '#section-2' }
      ], padding: 'none' }),
      block('logoCloud', { eyebrow: 'GOOD DESIGN HAS A WAY OF BRINGING US TOGETHER', items: [{ title: 'FORM & FIELD' }, { title: 'THE SLOW EDIT' }, { title: 'KINSHIP' }, { title: 'OBJECT JOURNAL' }] }),
      block('row', { columns: [
        column('atelier-col-one', [imageBox('interior', 'Spaces to slow down.', 'A fresh perspective on the places we call home.', '#section-4')]),
        column('atelier-col-two', [imageBox('ceramic', 'Objects with a story.', 'Meet the makers behind the everyday essentials.', '#section-4')]),
        column('atelier-col-three', [imageBox('architecture', 'Built with intention.', 'Honest materials. Lasting impressions.', '#section-4')])
      ] }),
      block('text', { eyebrow: 'OUR PHILOSOPHY', title: 'Less, but with a little more meaning.', body: 'We believe a well-lived life starts with the everyday. The light through a window. A favourite cup. A space that feels entirely your own. We share the ideas and objects that make those moments matter.', align: 'center', padding: 'large', background: '#f6f3ee' }),
      block('gallery', { eyebrow: 'THE ATELIER EDIT', title: 'Inspiration, in the details.', body: 'A collection of things we keep coming back to.', items: [
        { src: media('interior'), title: 'The living collection', body: 'Warm, welcoming, and naturally yours.' },
        { src: media('ceramic'), title: 'Made by hand', body: 'Every curve tells a story.' },
        { src: media('fashion'), title: 'Everyday essentials', body: 'Designed to stay with you.' }
      ] }),
      block('testimonials', { eyebrow: 'A FEW KIND WORDS', title: 'Spaces that make people feel something.', items: [
        { title: 'Maya R.', body: 'Thoughtful from the first conversation to the final detail. Our space feels more like us than we ever imagined.', icon: '★★★★★' },
        { title: 'Daniel & Noor', body: 'A beautifully considered approach. The small details make all the difference.', icon: '★★★★★' }
      ], background: '#f6f3ee', align: 'center' }),
      block('banner', { eyebrow: 'LET’S MAKE SOMETHING MEANINGFUL', title: 'Your next chapter starts here.', body: 'Have a space, an idea, or a story in mind? We would love to hear it.', src: '', alt: '', button: 'Start a conversation', url: 'mailto:hello@example.com', align: 'center', padding: 'large', background: '#e9e4d9' })
    ]
  },
  market: {
    name: 'Everyday Market', siteName: 'EVERYDAY', label: 'Good things, thoughtfully chosen.', intro: 'A clean, image-led product showcase for independent brands. Checkout can be connected separately.',
    accent: '#263c36', background: '#ffffff', font: 'sans', theme: 'market', poster: media('fashion'),
    sections: [
      block('slider', { items: [
        { src: media('fashion'), title: 'Everyday, made better.', body: 'The new collection. Timeless essentials, considered down to the last detail.', button: 'Discover the collection', url: '#section-2' },
        { src: media('ceramic'), title: 'Make a little room for beautiful.', body: 'Honest materials. Thoughtful design. Objects you will reach for again and again.', button: 'Explore home & living', url: '#section-2' }
      ], padding: 'none' }),
      block('stats', { items: [
        { title: 'Made to last', body: 'Thoughtful materials and careful craftsmanship.', price: '◇' },
        { title: 'Independent by nature', body: 'Small makers with a fresh point of view.', price: '✦' },
        { title: 'A personal touch', body: 'Real people, here when you need us.', price: '♡' }
      ], background: '#f6f7f5', padding: 'small' }),
      block('productGrid', { eyebrow: 'THE EVERYDAY COLLECTION', title: 'Meet your new favourites.', body: 'A few well-made things for a life well lived.', items: [
        { src: media('fashion'), title: 'The everyday linen shirt', body: 'Natural linen · Oat', price: '$68', button: 'Enquire', url: 'mailto:hello@example.com?subject=Linen%20shirt' },
        { src: media('ceramic'), title: 'The hand-finished vessel', body: 'Stoneware · Sand', price: '$42', button: 'Enquire', url: 'mailto:hello@example.com?subject=Ceramic%20vessel' },
        { src: media('interior'), title: 'The living collection', body: 'Considered pieces for your home', price: 'From $95', button: 'Enquire', url: 'mailto:hello@example.com?subject=Living%20collection' },
        { src: media('workspace'), title: 'The working essentials', body: 'A calmer, more useful workspace', price: 'From $35', button: 'Enquire', url: 'mailto:hello@example.com?subject=Working%20essentials' }
      ] }),
      block('row', { columns: [
        column('market-col-one', [imageBox('interior', 'A space to call your own.', 'The home edit — calm, useful, and full of character.', '#section-2')]),
        column('market-col-two', [imageBox('fashion', 'Wear it your way.', 'Simple essentials for wherever your day takes you.', '#section-2')])
      ] }),
      block('text', { eyebrow: 'A LITTLE ABOUT US', title: 'Fewer things. Better stories.', body: 'We bring together independent makers who care about what they create. A small collection, thoughtfully chosen — with room for you to make it your own.', align: 'center', background: '#f3f4f0', padding: 'large' }),
      block('accordion', { eyebrow: 'GOOD TO KNOW', title: 'The details, made simple.', items: [
        { title: 'How do I enquire about an item?', body: 'Choose Enquire on an item to send us a message. This starter is a product catalogue; online checkout is not connected.' },
        { title: 'Where are your pieces made?', body: 'Tell visitors about your makers, materials, and places of origin here. Replace this example with your own story.' },
        { title: 'What about delivery and returns?', body: 'Add your delivery areas, timelines, and return terms before sharing your catalogue with customers.' }
      ] }),
      block('banner', { eyebrow: 'STAY CURIOUS', title: 'Find something that feels like you.', body: 'We are always happy to help you choose.', button: 'Get in touch', url: 'mailto:hello@example.com', src: '', alt: '', align: 'center', background: '#e8ece7', padding: 'large' })
    ]
  },
  agency: {
    name: 'Northstar Agency', siteName: 'NORTHSTAR', label: 'Good ideas deserve a great beginning.', intro: 'A confident business theme for creative teams, consultants, and ambitious companies.',
    accent: '#315b82', background: '#ffffff', font: 'sans', theme: 'agency', poster: media('workspace'),
    sections: [
      block('banner', { eyebrow: 'STRATEGY. DESIGN. A FRESH PERSPECTIVE.', title: 'Make your next move matter.', body: 'We help ambitious people turn bold ideas into clear, useful experiences. A thoughtful partner, from the first question to the final detail.', button: 'Let’s talk about your idea', url: 'mailto:hello@example.com', src: media('workspace'), alt: 'An original illustration of a considered creative workspace', background: '#e8eef4', padding: 'large' }),
      block('logoCloud', { eyebrow: 'GOOD COMPANY, GREAT COLLABORATIONS', items: [{ title: 'KINETIC' }, { title: 'FIELDWORK' }, { title: 'ELEMENT' }, { title: 'OPENFORM' }] }),
      block('row', { columns: [
        column('agency-col-one', [block('iconBox', { icon: '◎', title: 'Find your direction.', body: 'Strategy that asks the right questions and gives your next chapter a clear point of view.' })]),
        column('agency-col-two', [block('iconBox', { icon: '◇', title: 'Build something useful.', body: 'Distinctive identities and digital experiences, designed around the people who use them.' })]),
        column('agency-col-three', [block('iconBox', { icon: '↗', title: 'Keep moving forward.', body: 'A collaborative approach that turns momentum into meaningful, lasting progress.' })])
      ] }),
      block('stats', { title: 'Small team. Lasting impact.', items: [{ price: '12+', title: 'Years of collective experience' }, { price: '40+', title: 'Thoughtful collaborations' }, { price: '100%', title: 'Committed to the details' }], background: '#f0f4f7', align: 'center' }),
      block('gallery', { eyebrow: 'SELECTED PERSPECTIVES', title: 'Good work starts with a better question.', body: 'A look at the ideas, spaces, and experiences we are drawn to.', items: [
        { src: media('architecture'), title: 'A new point of view', body: 'Brand strategy & direction' },
        { src: media('workspace'), title: 'Room for better work', body: 'Digital design & experience' },
        { src: media('interior'), title: 'Everyday, reimagined', body: 'Creative direction & storytelling' }
      ] }),
      block('pricing', { eyebrow: 'WAYS TO WORK TOGETHER', title: 'Start where you are.', body: 'Example packages — customise these to reflect your own services.', items: [
        { title: 'A fresh perspective', price: 'Let’s talk', body: 'A focused strategy session\nA clear set of priorities\nA practical next-step plan', button: 'Discuss your idea', url: 'mailto:hello@example.com?subject=Strategy%20session' },
        { title: 'A new beginning', price: 'Let’s build', body: 'Brand and digital direction\nA collaborative design process\nA launch plan with confidence', button: 'Explore a project', url: 'mailto:hello@example.com?subject=New%20project' },
        { title: 'An ongoing partnership', price: 'Let’s grow', body: 'A creative partner on your team\nRegular reviews and refinement\nSupport for the next chapter', button: 'Meet your partner', url: 'mailto:hello@example.com?subject=Ongoing%20partnership' }
      ], background: '#f5f7f9' }),
      block('testimonials', { eyebrow: 'BETTER, TOGETHER', title: 'A good partnership changes things.', items: [{ title: 'Your future collaborator', body: 'Replace this example with a real customer quote. A clear story and an honest recommendation can say more than a long list of promises.', icon: '“' }], align: 'center' }),
      block('banner', { eyebrow: 'YOUR NEXT CHAPTER', title: 'Let’s make something worth sharing.', body: 'An early thought, a tricky challenge, a big ambition — we are listening.', button: 'Start a conversation', url: 'mailto:hello@example.com', src: '', alt: '', background: '#e6edf4', align: 'center', padding: 'large' })
    ]
  }
};

export function themeCSS(site = {}) {
  if (!Object.hasOwn(themes, site.theme)) return '';
  const atelier = site.theme === 'atelier';
  const agency = site.theme === 'agency';
  const serif = site.font === 'serif' || (site.font === undefined && atelier);
  const headingFont = serif ? "Georgia,'Times New Roman',serif" : "'Arial',system-ui,sans-serif";
  const notice = atelier ? 'CONSIDERED SPACES. EVERYDAY BEAUTY.' : agency ? 'INDEPENDENT THINKING. MEANINGFUL WORK.' : 'THOUGHTFULLY CHOSEN. MADE FOR EVERYDAY.';
  return `
body{font-family:Arial,system-ui,sans-serif;font-size:14px;line-height:1.7;color:#253036}header{padding:58px 7% 25px;min-height:116px;position:relative;border-bottom:1px solid #edf0ed;gap:30px}header::before{content:'${notice}';position:absolute;top:0;left:0;width:100%;height:29px;display:flex;align-items:center;justify-content:center;background:${agency ? '#1e3449' : '#263c36'};color:#fff;font:9px/1 Arial,sans-serif;letter-spacing:1.8px}.brand{font-family:Arial,system-ui,sans-serif;font-size:23px;font-weight:800;letter-spacing:3px}nav{gap:27px}nav a{font-size:10px;text-transform:uppercase;font-weight:600;letter-spacing:1.2px}nav a[aria-current]{color:var(--accent)}.section{border-bottom:0;padding:70px 7%}.section.pad-large{padding:100px 7%}h1,h2,h3{font-family:${headingFont};letter-spacing:${serif ? '-1.5px' : '-1.8px'};font-weight:${serif ? '400' : '700'}}h1{font-size:clamp(40px,6.3vw,82px)}h2{font-size:clamp(30px,4vw,48px);max-width:760px}h3{font-size:24px;letter-spacing:-.7px}p{line-height:1.85;color:#687276;font-size:14px;max-width:650px}.eyebrow{font-size:9px;letter-spacing:2.1px;font-weight:700;margin-bottom:18px}a.button{padding:14px 24px;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;border-radius:0;gap:25px}.text[style*="text-align:center"]{max-width:none}.text[style*="text-align:center"] p{max-width:700px}.text[style*="text-align:center"] h2{max-width:780px}.row .row-grid{gap:30px}.column h2{font-size:30px;letter-spacing:-.7px}.column .section{padding:0}.column .imageBox{height:100%}.content-image{border-radius:0}.image-placeholder{border-radius:0}.slider{padding:0}.slider.pad-none{padding:0}.ux-slider{border-radius:0}.ux-slide{min-height:${atelier ? '560' : '510'}px;padding:0}.ux-slide img{object-fit:cover;object-position:center}.ux-slide-copy{width:100%;max-width:820px;padding:70px 8%;background:none}.ux-slide-copy h2{font-family:${headingFont};font-weight:${serif ? '400' : '700'};font-size:clamp(38px,6vw,76px);color:#fff;max-width:550px}.ux-slide-copy p{color:#ffffffdf;font-size:15px;max-width:440px}.ux-slide-copy .button{background:#fff;color:#263036}.gallery h2,.productGrid h2,.testimonials h2,.pricing h2{max-width:760px}.gallery .eyebrow,.productGrid .eyebrow{color:var(--accent)}.ux-gallery{gap:24px}.ux-gallery img{border-radius:0;object-fit:cover}.ux-gallery article{background:transparent;border:0;border-radius:0}.ux-gallery h3{font-size:20px}.ux-image-box{border-radius:0;box-shadow:none;border:0;background:transparent}.ux-image-box img{border-radius:0;object-fit:cover;aspect-ratio:4/5}.ux-image-box-copy{padding:24px 0 0}.ux-image-box-copy h2,.ux-image-box-copy h3{font-size:26px}.ux-image-box-copy p{font-size:13px;margin:12px 0 18px}.ux-image-box-copy .button{background:none;color:var(--accent);padding:0;border-bottom:1px solid currentColor;line-height:2.3}.ux-icon-box{padding:0;background:transparent;border:0}.ux-feature-icon{font-size:40px;color:var(--accent);background:none;width:auto;height:auto;border:0;margin-bottom:22px}.ux-stats{gap:35px}.ux-stats article{text-align:center;border:0;background:none;padding:20px}.ux-stats strong{font-size:${agency ? '52' : '18'}px;letter-spacing:${agency ? '-1px' : '-.3px'};color:var(--accent)}.ux-stats p{font-size:12px;margin:12px auto;max-width:240px}.ux-logos{gap:35px;filter:none;opacity:.7}.ux-logos>*{font-family:Arial,sans-serif;letter-spacing:3px;font-weight:700}.logoCloud{text-align:center;padding:37px 7%;border-bottom:1px solid #e9ece8}.logoCloud .eyebrow{color:#939c9b;font-size:8px;margin-bottom:24px}.ux-products{gap:25px;grid-template-columns:repeat(4,minmax(0,1fr))}.ux-products article{border:0;border-radius:0;background:none;box-shadow:none;padding:0}.ux-products img{aspect-ratio:4/5;object-fit:cover;border-radius:0}.ux-product-copy{padding:20px 0}.ux-products h3{font-size:16px;font-weight:600;letter-spacing:0;margin-top:0}.ux-products p{font-size:12px;line-height:1.6}.ux-products .button{padding:9px 15px;background:none;border:1px solid #d4dcd7;color:#334039;font-size:9px}.ux-products .ux-product-price{font-size:15px;color:var(--accent);font-weight:700}.ux-testimonials{gap:30px}.ux-testimonials figure{background:none;border:0;border-radius:0;padding:30px 10px}.ux-testimonials:has(>figure:only-child){grid-template-columns:1fr;max-width:850px;margin-left:auto;margin-right:auto}.ux-testimonials blockquote{font-family:${headingFont};font-size:clamp(20px,2.7vw,28px);line-height:1.6;margin:0 0 25px;color:#455149}.ux-testimonials figcaption strong{font:700 10px Arial,sans-serif;text-transform:uppercase;letter-spacing:1.4px}.ux-pricing{gap:25px}.ux-pricing article{border:1px solid #e0e6e9;box-shadow:none;border-radius:0;padding:35px 25px;background:#fff}.ux-pricing h3{font-size:20px;letter-spacing:-.5px}.ux-pricing .ux-price{font-size:30px;margin:22px 0;color:var(--accent)}.ux-pricing p{font-size:13px;line-height:2.3}.ux-accordion details{border:0;border-bottom:1px solid #dce3df;border-radius:0;background:none}.ux-accordion summary{padding:23px 0;font-weight:600;font-size:14px}.ux-accordion details p{padding:0 0 22px;margin:0}.banner{min-height:330px}.banner-image{opacity:${agency ? '.22' : '.28'};object-fit:cover}.banner-content{max-width:1000px;margin:auto}.banner h2{font-size:clamp(34px,5.2vw,64px);max-width:800px}.banner p{max-width:600px;font-size:15px}.banner[style*="text-align:left"] .banner-content{margin-left:0}.banner[style*="text-align:left"] h2{max-width:730px}.banner[style*="text-align:left"] p{max-width:530px}.section[style*="text-align:center"] .banner-content>*{margin-left:auto;margin-right:auto}footer{padding:35px 7%;border-top:1px solid #e2e7e3;background:#f5f6f3;font-family:Arial,sans-serif;font-size:10px;letter-spacing:.4px}.hero .art{border-radius:0}.gallery .ux-gallery img{aspect-ratio:4/3}@media(max-width:800px){header{padding:48px 6% 20px;min-height:105px;gap:20px}.brand{font-size:19px;letter-spacing:2px}nav{gap:15px}.section{padding:50px 6%}.section.pad-large{padding:65px 6%}.row .row-grid{gap:24px}.ux-slide{min-height:440px}.ux-slide-copy{padding:45px 8%}.ux-slide-copy h2{font-size:48px}.ux-stats strong{font-size:${agency ? '40' : '17'}px}.ux-products{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){header{flex-direction:column;align-items:center}header::before{font-size:7px;letter-spacing:1.2px}nav{justify-content:center}.brand{font-size:22px}.section{padding:42px 7%}.section.pad-large{padding:60px 7%}.slider.pad-none{padding:0}.ux-slide{min-height:460px}.ux-slide-copy{padding:45px 8%;max-width:100%}.ux-slide-copy h2{font-size:44px}.ux-slide-copy p{font-size:13px}.ux-image-box img{aspect-ratio:4/3}.ux-products{gap:20px}.ux-products h3{font-size:14px}.ux-pricing article{padding:30px 22px}.ux-testimonials figure{padding:20px 0}.ux-logos{gap:20px}.ux-logos>*{font-size:13px}.banner{min-height:300px}.banner h2{font-size:38px}footer{gap:15px}}
`;
}
