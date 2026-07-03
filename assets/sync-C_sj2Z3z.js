import{t as l}from"./vendor-BO4Y2sOF.js";const m=`
mutation ($mediaId: Int, $progress: Int, $status: MediaListStatus, $score: Float) {
  SaveMediaListEntry (mediaId: $mediaId, progress: $progress, status: $status, score: $score) {
    id
    progress
    status
    score
  }
}
`,g=`
mutation ($id: Int) {
  DeleteMediaListEntry (id: $id) {
    deleted
  }
}
`,S=`
query ($mediaId: Int) {
  Media (id: $mediaId) {
    mediaListEntry {
      id
    }
  }
}
`;function y(){return typeof document>"u"?null:document.cookie.split("; ").find(t=>t.trim().startsWith("anilist_token="))?.split("=")[1]||null}function f(){return typeof document>"u"?!1:document.cookie.split("; ").some(e=>e.trim().startsWith("mal_token="))}async function N(s,e,t=!0,n){return h({anilistId:s,progress:e,showToast:t,title:n,silent:!0})}async function M(s,e,t=!0,n){return h({malId:s,progress:e,showToast:t,title:n,silent:!0})}async function h(s){const{anilistId:e,malId:t,progress:n,status:i,score:o,showToast:a=!0,title:r,silent:c=!1}=s,d=typeof localStorage<"u"?localStorage.getItem("player-settings"):null,p=d?JSON.parse(d):{autoSyncAniList:!0,autoSyncMal:!0},u=[];p.autoSyncAniList&&e&&u.push(T(e,n,i,o,a,r)),p.autoSyncMal&&t&&u.push(A(t,n,i,o,a,r)),u.length>0&&await Promise.all(u)}async function k(s,e,t){const n=typeof localStorage<"u"?localStorage.getItem("player-settings"):null,i=n?JSON.parse(n):{autoSyncAniList:!0,autoSyncMal:!0},o=[];i.autoSyncAniList&&s&&o.push(L(s,t)),i.autoSyncMal&&e&&o.push(E(e,t)),o.length>0&&await Promise.all(o)}async function T(s,e,t,n,i=!0,o){const a=y();if(!a)return;const r={watching:"CURRENT",completed:"COMPLETED",plan_to_watch:"PLANNING",planned:"PLANNING",on_hold:"PAUSED",dropped:"DROPPED",paused:"PAUSED",rewatching:"REPEATING"},c={mediaId:s};e!==void 0&&(c.progress=e),t&&(c.status=r[t.toLowerCase()]||"WATCHING"),n!==void 0&&(c.score=n);try{(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:m,variables:c})})).json()).errors||i&&l.success("AniList Updated",{description:o?`${o} updated`:"Watchlist entry updated",duration:4e3})}catch{}}async function A(s,e,t,n,i=!0,o){if(f())try{(await fetch("/api/auth/mal/sync",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({malId:s,progress:e,status:t,score:n})})).ok&&i&&l.success("MyAnimeList Updated",{description:o?`${o} updated`:"Watchlist entry updated",duration:4e3})}catch{}}async function L(s,e){const t=y();if(!(!t||!s||isNaN(s)))try{const o=(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:S,variables:{mediaId:s}})})).json()).data?.Media?.mediaListEntry?.id;if(!o)return;(await(await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:g,variables:{id:o}})})).json()).errors||l.success("Removed from AniList",{description:e||"Watchlist entry removed"})}catch{}}async function E(s,e){if(f())try{(await fetch("/api/auth/mal/sync",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({malId:s})})).ok&&l.success("Removed from MyAnimeList",{description:e||"Watchlist entry removed"})}catch{}}export{k as a,M as b,h,N as s};
