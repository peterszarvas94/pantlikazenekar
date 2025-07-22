import 'kleur/colors';
import { d as decodeKey } from './chunks/astro/server_DZSa-pY3.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cu9mq3kT.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/szarvaspeter/projects/pantlika/","cacheDir":"file:///Users/szarvaspeter/projects/pantlika/node_modules/.astro/","outDir":"file:///Users/szarvaspeter/projects/pantlika/dist/","srcDir":"file:///Users/szarvaspeter/projects/pantlika/src/","publicDir":"file:///Users/szarvaspeter/projects/pantlika/public/","buildClientDir":"file:///Users/szarvaspeter/projects/pantlika/dist/client/","buildServerDir":"file:///Users/szarvaspeter/projects/pantlika/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css?family=Lato:100,300,400,700&subset=latin-ext\";@font-face{font-family:fontello;src:url(/font/fontello.eot?6750589);src:url(/font/fontello.eot?6750589#iefix) format(\"embedded-opentype\"),url(/font/fontello.woff2?6750589) format(\"woff2\"),url(/font/fontello.woff?6750589) format(\"woff\"),url(/font/fontello.ttf?6750589) format(\"truetype\"),url(/font/fontello.svg?6750589#fontello) format(\"svg\");font-weight:400;font-style:normal}[class^=icon-]:before,[class*=\" icon-\"]:before{font-family:fontello;font-style:normal;font-weight:400;speak:none;display:inline-block;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-phone-squared:before{content:\"\"}.icon-youtube-squared:before{content:\"\"}.icon-mail-squared:before{content:\"\"}.icon-facebook-squared:before{content:\"\"}.icon-instagram-1:before{content:\"\"}html{margin:0;padding:0;font-size:16px}body{font-family:Lato,sans-serif;background-image:url(/_astro/background.Dpf73EGu.png);background-repeat:repeat;background-position:left-top;background-attachment:fixed;padding:1rem;margin:0;backdrop-filter:blur(1.5px)}main{width:100%;max-width:60rem;margin:0 auto}.sav{display:block;width:22rem;margin:3rem auto;max-width:100%;height:100%}.logo{display:block;margin:.5rem auto;max-width:100%;width:30rem;height:100%}.social_links{text-align:center;font-size:2.5rem;list-style:none;display:flex;padding:0;justify-content:center;align-items:center}.social_links a:link,.social_links a:visited,.social_links a:active{color:#000;text-decoration:none}.social_links a:hover{color:#b60302}.yt_outer{display:block;margin:0 auto}.yt_inner{position:relative;width:100%;height:0;padding-bottom:56.25%}.yt_iframe{position:absolute;top:0;left:0;width:100%;height:100%}.contract{display:flex;justify-content:center;align-items:center;gap:.3rem;width:fit-content;margin:3rem auto 0;text-align:center;text-decoration:none;font-size:1.3rem;color:#000;padding:.5rem .8rem;border:1px solid black;border-radius:1rem;background-color:#0186ff80}.contract:hover{background-color:#0186ffb3}.about_title{font-size:2rem;font-weight:700}.about{font-size:1.2rem;text-align:justify}.members{display:flex;justify-content:space-between;align-items:center;margin:0 auto;width:100%}.members_title{font-size:2rem;font-weight:700}.members_list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;font-size:1.2rem}.members_pic{max-width:40rem;width:100%;height:100%}.csoori{font-size:1.2rem;text-align:justify}.csoori-logo-container{display:flex;justify-content:center;align-items:center;gap:1rem;flex-wrap:wrap}.csoori-logo{display:inline-block}.csoori-title{font-size:2rem;font-weight:700}.csoori ul{padding:0 0 0 1.5rem;list-style:square}.csoori-image-container{display:flex;width:100%;justify-content:space-between;align-items:center;flex-wrap:wrap}.csoori-image{width:29rem;height:100%}.author{font-size:1.2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;padding-bottom:3rem}.author p{margin:0}.author a,.author a:link,.author a:visited,.author a:active .author a:hover{color:#000;text-decoration:underline}@media only screen and (max-width: 63rem){.members{flex-direction:column;gap:2rem}.members_child{text-align:center}.csoori-image-container{justify-content:center;flex-direction:column;gap:2rem}.csoori-image{width:100%}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/szarvaspeter/projects/pantlika/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/Users/szarvaspeter/projects/pantlika/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Coh00Jwd.mjs","\u0000@astrojs-manifest":"manifest_BCMKyt6j.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/Pántlika_Zenekar_szerződés._doGK04n.pdf","/_astro/background.Dpf73EGu.png","/_astro/2.BLeDsuDY.png","/_astro/1.EyJCQSaq.png","/_astro/sav.2UIavYX1.png","/_astro/logo.BJTCp4Ms.png","/_astro/studio2.BcodI5LN.jpg","/_astro/studio1.BIKv7fn2.jpg","/_astro/borito.BR4NWjZs.jpg","/favicon.svg","/font/fontello.eot","/font/fontello.svg","/font/fontello.ttf","/font/fontello.woff","/font/fontello.woff2"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"PY5BMDYJK3vRufhnztC5Di0yC1HQgvdq47RgejnWQFk="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
