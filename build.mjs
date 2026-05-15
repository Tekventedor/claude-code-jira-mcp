// Builds template.json from inline React component source below.
// Edit a scene, re-run `node build.mjs`, click Load again in the playground.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { CLAUDE_ICON, ATLASSIAN_MARK } from './assets.mjs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const FPS = 30;
// Playback order: pivot → KAN explainer → demo → arch → install → cta.
// (The "snapshot" key is the KAN-explainer scene; we kept the F key name
// stable so the component map below didn't have to be rewritten.)
const F = {
  pivot:      { start: 0,    end: 90,    dur: 90  },  // 3s
  snapshot:   { start: 90,   end: 330,   dur: 240 },  // 8s   — Project-code primer
  demo:       { start: 330,  end: 570,   dur: 240 },  // 8s   — Bug-triage walkthrough at 2x
  arch:       { start: 570,  end: 730,   dur: 160 },  // ~5.3s
  fhOAuth:    { start: 730,  end: 1015,  dur: 285 },  // 9.5s — FlowHunt + Atlassian OAuth
  fhMcp:      { start: 1015, end: 1300,  dur: 285 },  // 9.5s — MCP Server config + Connect JSON
  fhBridge:   { start: 1300, end: 1570,  dur: 270 },  // 9s   — One JSON, two surfaces (local + online)
  fhUsage:    { start: 1570, end: 1840,  dur: 270 },  // 9s   — FlowHunt agent in action (scroll)
  cta:        { start: 1840, end: 2080,  dur: 240 },  // 8s
};
const TOTAL_FRAMES = 2080;
const TOTAL_SECONDS = TOTAL_FRAMES / FPS;

const HELPERS = `var R=React.createElement;var cl=function(x){return Math.max(0,Math.min(1,x));};var ease=function(t){return 1-Math.pow(1-t,3);};var easeIn=function(t){return t*t*t;};var easeInOut=function(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;};var easeBack=function(t){var c1=1.70158;var c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};var lerp=function(a,b,t){return a+(b-a)*t;};var grad='linear-gradient(90deg,#0084FF,#1A56DB)';`;

const FH_MARK_PATH = 'M36.369 175.282L24.2163 203.986C22.1071 208.969 23.073 214.948 27.1337 219.014C29.8048 221.688 33.3037 223.02 36.8027 223.02C40.3016 223.02 43.8006 221.688 46.4716 219.014L58.023 207.449L101.627 163.787C103.647 161.764 102.218 158.32 99.3599 158.32H74.5815C74.4336 158.32 74.2858 158.3 74.1281 158.3C48.0289 158.3 26.8578 136.8 27.3506 110.563C27.8335 84.9175 49.2905 64.6304 74.9067 64.6304H127.785C128.633 64.6304 129.451 64.295 130.052 63.6931L151.006 42.7153C153.027 40.6925 151.598 37.2488 148.739 37.2488H75.1531C34.0134 37.2488 -0.365082 70.9455 -0.000396729 112.131C0.236145 138.98 14.7839 162.454 36.3591 175.302L36.369 175.282ZM199.992 158.31C225.608 158.31 247.065 138.023 247.548 112.378C248.031 86.7331 226.87 64.6403 200.77 64.6403C200.613 64.6403 200.445 64.6206 200.287 64.6206H175.529C172.68 64.6206 171.251 61.167 173.262 59.1541L219.103 13.2615H219.093L228.121 4.20336C233.276 -0.957219 241.664 -1.50979 247.124 3.33504C251.707 7.39048 252.88 13.7154 250.662 18.945L238.51 47.639C260.105 60.4763 274.662 83.9505 274.909 110.799C275.273 151.985 240.895 185.692 199.755 185.692H126.159C123.31 185.692 121.881 182.238 123.892 180.225L144.846 159.248C145.447 158.646 146.266 158.31 147.113 158.31H200.002H199.992ZM186.617 87.1771C199.696 87.1771 210.301 97.7943 210.301 110.888C210.301 123.982 199.696 134.599 186.617 134.599C173.538 134.599 162.932 123.982 162.932 110.888C162.932 97.7943 173.538 87.1771 186.617 87.1771ZM89.829 87.1673C102.908 87.1673 113.513 97.7844 113.513 110.878C113.513 123.972 102.908 134.589 89.829 134.589C76.7498 134.589 66.1445 123.972 66.1445 110.878C66.1445 97.7844 76.7498 87.1673 89.829 87.1673Z';

/* ============================================================================
 * SCENE 1 — Pivot (90f, 3s) — title card "Claude Code reads Atlassian."
 * ========================================================================== */
const PivotScene = `function PivotScene(props){${HELPERS}
  var f=props.frame||0;
  var inP=ease(cl(f/20));
  var outP=easeIn(cl((f-70)/20));
  var op=inP-outP;
  var underP=ease(cl((f-22)/22));
  var subP=ease(cl((f-30)/22));
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif'}},
    R('div',{style:{opacity:op,textAlign:'center',fontSize:'108px',fontWeight:800,color:'#111928',lineHeight:1.1,letterSpacing:'-2px'}},
      'Claude Code reads ',
      R('span',{style:{position:'relative',display:'inline-block'}},
        R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Jira.'),
        R('span',{style:{position:'absolute',left:0,right:'8%',bottom:'-4px',height:'8px',borderRadius:'4px',background:grad,transform:'scaleX('+underP+')',transformOrigin:'left center'}})
      )
    ),
    R('div',{style:{marginTop:'40px',fontSize:'30px',fontWeight:500,color:'#6B7280',opacity:subP*(1-outP),transform:'translateY('+(10*(1-subP))+'px)'}},'Via the Atlassian MCP server.')
  );
}`;

/* ============================================================================
 * SCENE 2 — Demo (slot 240f / 8s; internal 480f animation at 2x speed)
 * Frames are remapped ×2 so the whole walkthrough finishes twice as fast
 * while keeping the original beat timings (each tool call still gets its
 * hold, just compressed). Same plain-English copy throughout.
 * ========================================================================== */
const DemoScene = `function DemoScene(props){${HELPERS}
  var f=(props.frame||0)*2;     // 2x speed-up — see header comment
  var END=480;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  // Left terminal slides in
  var termIn=ease(cl(f/26));
  // Prompt — written like someone talking, not Jira jargon
  var promptCmd='Find any bug nobody is fixing. Make a reminder ticket.';
  var typeStart=34, typeDur=50;
  var promptTyped=promptCmd.slice(0, Math.floor(cl((f-typeStart)/typeDur)*promptCmd.length));
  var caretOn=f>=typeStart && (Math.floor((f-typeStart)/8))%2===0 && f<typeStart+typeDur+30;
  function lineAt(d){return ease(cl((f-d)/9));}
  // Tool 1 — fires after ~50f hold so the viewer can read the prompt
  var t1Call=lineAt(130), t1Res=lineAt(150);
  // Tool 2 — fires after ~60f hold so the viewer can read "using KAN"
  var t2Call=lineAt(210), t2Jql=lineAt(228), t2Res=lineAt(248);
  // Tool 3 — fires after ~70f hold so the viewer can read the bug line
  var t3Call=lineAt(320), t3Fields=lineAt(338), t3Done=lineAt(364), t3Url=lineAt(380);
  // Right pane: card fades in with tool 1, KAN-3 row with tool 2 result,
  // then morphs into the new reminder card when tool 3 fires.
  var cardIn=ease(cl((f-130)/30));
  var k3In=ease(cl((f-248)/24));
  var morphP=easeInOut(cl((f-340)/44));
  var k4Fade=ease(cl((f-388)/22));
  // KAN-3 / KAN-4 explainer pills — both sit in the mid-bottom of the
  // terminal, both styled the same way (dark plate + yellow mono key).
  // They fade in as each key first appears on screen and stay until scene-out.
  var ann1=ease(cl((f-264)/22));   // KAN-3 explainer (after search result lands)
  var ann2=ease(cl((f-388)/22));   // KAN-4 explainer (after create succeeds)

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op,overflow:'hidden'}},

    // LEFT — Claude Code terminal
    R('div',{style:{position:'absolute',left:'40px',top:'40px',width:'900px',height:'920px',background:'#0F172A',borderRadius:'10px',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',overflow:'hidden',opacity:termIn,transform:'translateX('+(-30*(1-termIn))+'px)'}},
      R('div',{style:{height:'52px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        // Claude Code badge — real Claude AI mark (PNG/webp inlined via assets.mjs).
        R('div',{style:{marginLeft:'18px',display:'flex',alignItems:'center',gap:'10px',padding:'5px 12px',background:'rgba(217,119,87,0.14)',border:'1px solid rgba(217,119,87,0.40)',borderRadius:'8px'}},
          R('img',{src:'${CLAUDE_ICON}',style:{width:26,height:26,display:'block',borderRadius:'6px',boxShadow:'0 2px 6px rgba(217,119,87,0.35)'}}),
          R('div',{style:{fontSize:'15px',color:'#F8FAFC',fontWeight:700,letterSpacing:'-0.2px'}},'Claude Code')
        ),
        R('div',{style:{marginLeft:'12px',fontSize:'12px',color:'#64748B',fontFamily:'JetBrains Mono,monospace'}},'·  atlassian MCP')
      ),
      R('div',{style:{padding:'30px 36px',fontFamily:'JetBrains Mono,monospace',fontSize:'16px',lineHeight:1.55,color:'#E2E8F0'}},
        R('div',null,
          R('span',{style:{color:'#22C55E'}},'> '),
          R('span',null, promptTyped),
          caretOn?R('span',{style:{display:'inline-block',width:9,height:18,background:'#E2E8F0',marginLeft:2,verticalAlign:'middle'}}):null
        ),
        // tool 1
        t1Call>0.01?R('div',{style:{marginTop:18,opacity:t1Call}},
          R('span',{style:{color:'#94A3B8'}},'⏺ '),
          R('span',{style:{color:'#0084FF',fontWeight:700}},'atlassian'),
          R('span',{style:{color:'#94A3B8'}},'('),
          R('span',{style:{color:'#FBBF24'}},'getVisibleJiraProjects'),
          R('span',{style:{color:'#94A3B8'}},')')
        ):null,
        t1Res>0.01?R('div',{style:{opacity:t1Res,color:'#94A3B8'}},'  ⎿  Found your project: ',R('span',{style:{color:'#22D3EE',fontWeight:700}},'KAN')):null,
        // tool 2
        t2Call>0.01?R('div',{style:{marginTop:14,opacity:t2Call}},
          R('span',{style:{color:'#94A3B8'}},'⏺ '),
          R('span',{style:{color:'#0084FF',fontWeight:700}},'atlassian'),
          R('span',{style:{color:'#94A3B8'}},'('),
          R('span',{style:{color:'#FBBF24'}},'searchJiraIssuesUsingJql'),
          R('span',{style:{color:'#94A3B8'}},')')
        ):null,
        t2Jql>0.01?R('div',{style:{opacity:t2Jql,color:'#94A3B8',marginLeft:'24px'}},'looking for: ',R('span',{style:{color:'#E2E8F0'}},'bugs in '),R('span',{style:{color:'#22D3EE'}},'KAN'),R('span',{style:{color:'#E2E8F0'}},' with no one assigned')):null,
        t2Res>0.01?R('div',{style:{opacity:t2Res,color:'#94A3B8'}},'  ⎿  Found 1 bug nobody is fixing:'):null,
        t2Res>0.01?R('div',{style:{opacity:t2Res,color:'#E2E8F0',marginLeft:'24px'}},R('span',{style:{color:'#22D3EE',fontWeight:700}},'KAN-3'),'  Login form rejects valid emails'):null,
        // tool 3
        t3Call>0.01?R('div',{style:{marginTop:14,opacity:t3Call}},
          R('span',{style:{color:'#94A3B8'}},'⏺ '),
          R('span',{style:{color:'#0084FF',fontWeight:700}},'atlassian'),
          R('span',{style:{color:'#94A3B8'}},'('),
          R('span',{style:{color:'#FBBF24'}},'createJiraIssue'),
          R('span',{style:{color:'#94A3B8'}},')')
        ):null,
        t3Fields>0.01?R('div',{style:{opacity:t3Fields,color:'#94A3B8',marginLeft:'24px'}},
          R('div',null,'title: ',R('span',{style:{color:'#FBBF24'}},'"Fix login form email validation"')),
          R('div',null,'fixes: ',R('span',{style:{color:'#22D3EE'}},'KAN-3'))
        ):null,
        t3Done>0.01?R('div',{style:{opacity:t3Done,color:'#22C55E',marginTop:8}},'  ⎿  ✓ New ticket created · ',R('span',{style:{fontWeight:700}},'KAN-4')):null,
        t3Url>0.01?R('div',{style:{opacity:t3Url,marginLeft:'24px',color:'#22D3EE',textDecoration:'underline'}},'yourcompany.atlassian.net/browse/KAN-4'):null
      )
    ),

    // RIGHT — Jira issue card preview
    cardIn>0.005?R('div',{style:{position:'absolute',right:'40px',top:'40px',width:'900px',height:'920px',background:'#FFFFFF',borderRadius:'10px',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',overflow:'hidden',opacity:cardIn}},
      // Jira chrome
      R('div',{style:{height:'46px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'10px'}},
        R('div',{style:{width:24,height:24,borderRadius:'4px',background:'#0052CC',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'14px',fontWeight:800}},'J'),
        R('div',{style:{fontSize:'13px',color:'#42526E'}},'yourcompany.atlassian.net / projects / KAN')
      ),
      // Pre-morph state: KAN-3 search result card (the open, unowned bug)
      morphP<0.95?R('div',{style:{padding:'40px 50px',opacity:1-morphP}},
        R('div',{style:{fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'BUGS NOBODY IS FIXING'),
        R('div',{style:{marginTop:'20px',padding:'18px 22px',background:'#FAFBFC',borderRadius:'6px',border:'1px solid #DFE1E6',display:'flex',alignItems:'center',gap:'16px',opacity:k3In}},
          R('div',{style:{width:'30px',height:'30px',background:'#DE350B',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontFamily:'Inter,system-ui,sans-serif',fontSize:'14px'}},'!'),
          R('div',{style:{flex:1}},
            R('div',{style:{fontSize:'14px',color:'#0052CC',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'KAN-3'),
            R('div',{style:{fontSize:'18px',color:'#172B4D',marginTop:'2px'}},'Login form rejects valid emails')
          ),
          R('div',{style:{padding:'4px 10px',background:'#FFEBE6',color:'#BF2600',fontSize:'11px',fontWeight:700,borderRadius:'3px'}},'OPEN'),
          R('div',{style:{fontSize:'12px',color:'#6B778C'}},'Unassigned · reported 2026-05-12')
        )
      ):null,
      // Post-morph state: KAN-4 the triage task Claude just filed
      morphP>0.05?R('div',{style:{position:'absolute',top:'46px',left:0,right:0,bottom:0,padding:'40px 50px',opacity:morphP}},
        R('div',{style:{fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'PROJECTS / KAN / KAN-4'),
        R('div',{style:{marginTop:'12px',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{padding:'2px 8px',background:'#E3FCEF',color:'#006644',fontSize:'11px',fontWeight:700,borderRadius:'3px'}},'TASK'),
          R('div',{style:{fontFamily:'JetBrains Mono,monospace',fontSize:'14px',color:'#0052CC',fontWeight:700}},'KAN-4')
        ),
        R('div',{style:{marginTop:'14px',fontSize:'32px',fontWeight:800,color:'#172B4D',opacity:k4Fade}},'Fix login form email validation'),
        R('div',{style:{marginTop:'10px',display:'flex',gap:'10px'}},
          R('div',{style:{padding:'3px 10px',background:'#EAECF0',color:'#42526E',fontSize:'11px',fontWeight:700,borderRadius:'3px'}},'TO DO')
        ),
        R('div',{style:{marginTop:'30px',fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'FIXES'),
        R('div',{style:{height:'1px',background:'#DFE1E6',marginTop:'8px'}}),
        R('div',{style:{marginTop:'16px',padding:'12px 14px',background:'#FAFBFC',border:'1px solid #DFE1E6',borderRadius:'6px',display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{width:'22px',height:'22px',background:'#DE350B',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontSize:'12px'}},'!'),
          R('span',{style:{color:'#0052CC',fontWeight:700,fontFamily:'JetBrains Mono,monospace',fontSize:'14px'}},'KAN-3'),
          R('span',{style:{fontSize:'15px',color:'#172B4D'}},'Login form rejects valid emails'),
          R('span',{style:{marginLeft:'auto',fontSize:'12px',color:'#6B778C'}},'Open · No owner')
        ),
        R('div',{style:{marginTop:'22px',fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'DESCRIPTION'),
        R('div',{style:{height:'1px',background:'#DFE1E6',marginTop:'8px'}}),
        R('div',{style:{marginTop:'14px',fontSize:'15px',color:'#42526E',lineHeight:1.55}},'Update the email-validation regex on the login form so standard addresses are accepted. Verify on Chrome and Firefox, then close when the bug above no longer reproduces.')
      ):null
    ):null,

    // ─── KAN-3 / KAN-4 explainer pills — stacked at the mid-bottom of the
    //     terminal pane, both using the same dark/yellow styling so the
    //     viewer reads them as a matching pair (key on the left, plain-
    //     English meaning on the right). ───
    // Terminal occupies x:40..940, y:40..960 → centre x=490. Pills sit at
    // y ≈ 760 and 825 (well below the last tool-output line).
    ann1>0.005?R('div',{style:{position:'absolute',left:'490px',top:'760px',transform:'translateX(-50%) translateY('+(8*(1-ann1))+'px)',opacity:ann1,background:'#111928',color:'#FFFFFF',padding:'12px 22px',borderRadius:'10px',fontSize:'17px',fontWeight:600,whiteSpace:'nowrap',boxShadow:'0 12px 28px rgba(0,0,0,0.40)',zIndex:10,display:'flex',alignItems:'center',gap:'12px'}},
      R('span',{style:{color:'#FBBF24',fontFamily:'JetBrains Mono,monospace',fontWeight:800}},'KAN-3'),
      R('span',{style:{color:'#94A3B8'}},'—'),
      R('span',null,'An existing bug nobody is fixing')
    ):null,
    ann2>0.005?R('div',{style:{position:'absolute',left:'490px',top:'825px',transform:'translateX(-50%) translateY('+(8*(1-ann2))+'px)',opacity:ann2,background:'#111928',color:'#FFFFFF',padding:'12px 22px',borderRadius:'10px',fontSize:'17px',fontWeight:600,whiteSpace:'nowrap',boxShadow:'0 12px 28px rgba(0,0,0,0.40)',zIndex:10,display:'flex',alignItems:'center',gap:'12px'}},
      R('span',{style:{color:'#FBBF24',fontFamily:'JetBrains Mono,monospace',fontWeight:800}},'KAN-4'),
      R('span',{style:{color:'#94A3B8'}},'—'),
      R('span',null,'Claude\\'s new fix task')
    ):null
  );
}`;

/* ============================================================================
 * SCENE 3 — Architecture (160f, ~5.3s) — pipeline diagram, 1.5x speed
 * Internal animation curves keep their original timings; we remap the
 * incoming frame counter by ×1.5 so the whole scene plays 1.5x faster.
 * ========================================================================== */
const ArchScene = `function ArchScene(props){${HELPERS}
  var f=(props.frame||0)*1.5;   // 1.5x speed-up — see header comment
  var END=240;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));
  function nIn(d){return easeBack(cl((f-d)/22));}
  var n1=nIn(0), n2=nIn(20), n3=nIn(40);
  function lab(d){return ease(cl((f-d)/16));}
  var l1=lab(70), l2=lab(90);

  // 3 nodes only — You / Claude Code / Atlassian MCP server.
  // "atlassian MCP" and "Jira" are effectively the same surface for this video,
  // so they're collapsed into one Atlassian node (the MCP fronts Jira; the
  // viewer doesn't need to track the indirection).
  var nodes=[
    { x:380,  label:'You',                   sub:'your prompt',  iconKind:'term' },
    { x:960,  label:'Claude Code',           sub:'agent',        iconKind:'dot'  },
    { x:1540, label:'Atlassian MCP server',  sub:'your Jira data', iconKind:'a'  }
  ];
  var ny=480;
  var nw=240, nh=200;

  function nodeIcon(kind){
    // "You" stays as a simple terminal mark — generic, not branded.
    if(kind==='term') return R('div',{style:{width:54,height:54,borderRadius:'12px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'22px',fontWeight:800}}, '>_');
    // Claude Code — real Claude AI mark.
    if(kind==='dot')  return R('img',{src:'${CLAUDE_ICON}',width:54,height:54,style:{display:'block',borderRadius:'12px'}});
    // Atlassian MCP server — real Atlassian mark on white tile so the
    // blue mark reads clearly at small sizes.
    return R('div',{style:{width:54,height:54,borderRadius:'12px',background:'#FFFFFF',border:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'center'}},
      R('img',{src:'${ATLASSIAN_MARK}',width:38,height:38,style:{display:'block'}})
    );
  }

  function node(n, p){
    var s=0.92+0.08*p;
    return R('div',{key:n.label,style:{position:'absolute',left:(n.x-nw/2)+'px',top:(ny-nh/2)+'px',width:nw,height:nh,background:'#FFFFFF',border:'1.5px solid #E5E7EB',borderRadius:'16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px',boxShadow:'0 12px 28px rgba(17,25,40,0.08)',opacity:p,transform:'scale('+s+')'}},
      nodeIcon(n.iconKind),
      R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928',whiteSpace:'nowrap'}}, n.label),
      R('div',{style:{fontSize:'13px',color:'#6B7280'}}, n.sub)
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},
    // Title
    R('div',{style:{position:'absolute',left:'50%',top:'140px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'HOW IT FLOWS'),
    R('div',{style:{position:'absolute',left:'50%',top:'180px',transform:'translateX(-50%)',fontSize:'36px',fontWeight:800,color:'#111928'}},'One prompt. One round-trip. Real Atlassian data.'),

    // Plain connecting lines (no animation, no arrows, no travelling dot).
    // The horizontal layout already implies flow; the labels carry the meaning.
    R('svg',{style:{position:'absolute',left:0,top:0,pointerEvents:'none'},width:1920,height:1080},
      R('line',{x1:nodes[0].x+nw/2,y1:ny,x2:nodes[1].x-nw/2,y2:ny,stroke:'#E5E7EB',strokeWidth:2}),
      R('line',{x1:nodes[1].x+nw/2,y1:ny,x2:nodes[2].x-nw/2,y2:ny,stroke:'#E5E7EB',strokeWidth:2})
    ),

    // Labels centred on each line
    l1>0.005?R('div',{style:{position:'absolute',left:(nodes[0].x+nw/2)+'px',top:(ny-32)+'px',width:(nodes[1].x-nodes[0].x-nw)+'px',textAlign:'center',fontSize:'15px',fontWeight:600,color:'#0084FF',opacity:l1}},'natural-language prompt'):null,
    l2>0.005?R('div',{style:{position:'absolute',left:(nodes[1].x+nw/2)+'px',top:(ny-32)+'px',width:(nodes[2].x-nodes[1].x-nw)+'px',textAlign:'center',fontSize:'15px',fontWeight:600,color:'#0084FF',opacity:l2}},'MCP tool call'):null,
    l1>0.005?R('div',{style:{position:'absolute',left:(nodes[0].x+nw/2)+'px',top:(ny+14)+'px',width:(nodes[1].x-nodes[0].x-nw)+'px',textAlign:'center',fontSize:'15px',fontWeight:600,color:'#6B7280',opacity:l1}},'agent answer'):null,
    l2>0.005?R('div',{style:{position:'absolute',left:(nodes[1].x+nw/2)+'px',top:(ny+14)+'px',width:(nodes[2].x-nodes[1].x-nw)+'px',textAlign:'center',fontSize:'15px',fontWeight:600,color:'#6B7280',opacity:l2}},'issue JSON'):null,

    // Nodes
    node(nodes[0], n1),
    node(nodes[1], n2),
    node(nodes[2], n3)
  );
}`;

/* ============================================================================
 * SCENE 4 — Install (180f, 6s) — one-liner command + OAuth flash
 * ========================================================================== */
/* ============================================================================
 * KAN explainer (240f, 8s) — plays SECOND in the timeline (after the pivot
 * title card, before the demo). Sets up vocabulary the viewer needs to
 * follow the bug-triage demo: what a project key is, what an issue key
 * is, and what else the same Atlassian login lets Claude do.
 * The component name is SnapshotScene for historical reasons; the F key
 * is `snapshot`. Don't be misled by the name — there's no snapshot here.
 * ========================================================================== */
const SnapshotScene = `function SnapshotScene(props){${HELPERS}
  var f=props.frame||0;
  var END=240;
  var op=ease(cl(f/22))-easeIn(cl((f-(END-22))/22));
  // Hierarchy panel fade-in beats
  var siteIn=easeBack(cl(f/22));
  var projIn=easeBack(cl((f-18)/22));
  var i1In=easeBack(cl((f-36)/18));
  var i2In=easeBack(cl((f-48)/18));
  var i3In=easeBack(cl((f-60)/18));    // highlight: KAN-3 (resolved, JQL found this)
  var i4In=easeBack(cl((f-78)/18));    // highlight: KAN-4 (Claude created this)
  // Right-side annotation labels
  var l1=ease(cl((f-96)/18));
  var l2=ease(cl((f-114)/18));
  // Bottom ribbon: tool categories
  var rib=ease(cl((f-140)/22));
  function chip(d){return easeBack(cl((f-(140+d))/18));}
  var c1=chip(0), c2=chip(10), c3=chip(20), c4=chip(30), c5=chip(40), c6=chip(50);
  var pillP=cl(ease(cl((f-180)/14))-easeIn(cl((f-(END-22))/14)));

  // Helper: an issue row in the project tree
  function row(args){
    var prog=args.prog, key=args.key, summary=args.summary, tag=args.tag, tagColor=args.tagColor;
    if(prog<0.005)return null;
    var bg = tag ? (tag==='JQL match' ? '#ECFDF5' : '#EFF6FF') : 'transparent';
    var bd = tag ? (tag==='JQL match' ? '#10B981' : '#0084FF') : '#E5E7EB';
    return R('div',{style:{opacity:prog,transform:'translateX('+((1-prog)*-14)+'px)',marginTop:'14px',padding:'14px 18px',borderLeft:'4px solid '+bd,background:bg,borderRadius:'0 10px 10px 0',display:'flex',alignItems:'center',gap:'16px'}},
      R('div',{style:{fontFamily:'JetBrains Mono,monospace',fontSize:'19px',fontWeight:800,color:'#0052CC',minWidth:'78px'}}, key),
      R('div',{style:{fontSize:'18px',color:'#172B4D',flex:1}}, summary),
      tag ? R('div',{style:{padding:'4px 10px',background:tagColor,color:'#FFFFFF',fontSize:'12px',fontWeight:700,borderRadius:'999px',letterSpacing:'0.04em'}}, tag) : null
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F9FAFB',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Eyebrow + title ───
    R('div',{style:{position:'absolute',left:'50%',top:'66px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'PROJECT CODES'),
    R('div',{style:{position:'absolute',left:'50%',top:'104px',transform:'translateX(-50%)',fontSize:'42px',fontWeight:800,color:'#111928',letterSpacing:'-0.5px'}},'Every project has a short code'),
    R('div',{style:{position:'absolute',left:'50%',top:'162px',transform:'translateX(-50%)',fontSize:'22px',color:'#6B7280',fontWeight:500}},'Ours is KAN because we used a Kanban template. Yours can be anything.'),

    // ─── LEFT (60%): the hierarchy tree ───
    R('div',{style:{position:'absolute',left:'80px',top:'230px',width:'1050px'}},
      // Site row
      R('div',{style:{opacity:siteIn,transform:'translateY('+(10*(1-siteIn))+'px)',display:'flex',alignItems:'center',gap:'14px',padding:'10px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px'}},
        R('div',{style:{width:36,height:36,borderRadius:'8px',background:'#0052CC',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontFamily:'JetBrains Mono,monospace',fontSize:'14px'}},'A'),
        R('div',null,
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:700,letterSpacing:'0.06em'}},'SITE'),
          R('div',{style:{fontSize:'18px',color:'#111928',fontWeight:700}},'yourcompany.atlassian.net')
        )
      ),
      // Project row
      R('div',{style:{marginTop:'14px',marginLeft:'34px',opacity:projIn,transform:'translateX('+((1-projIn)*-14)+'px)',display:'flex',alignItems:'center',gap:'14px',padding:'14px 18px',background:'linear-gradient(90deg,rgba(0,132,255,0.08),rgba(26,86,219,0.04))',border:'1.5px solid #0084FF',borderRadius:'12px'}},
        R('div',{style:{padding:'6px 14px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'20px',fontWeight:800,borderRadius:'8px'}},'KAN'),
        R('div',{style:{flex:1}},
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:700,letterSpacing:'0.06em'}},'YOUR PROJECT'),
          R('div',{style:{fontSize:'18px',color:'#111928',fontWeight:700}},'Web app team')
        ),
        R('div',{style:{fontSize:'13px',color:'#6B7280',fontWeight:600}}, '4 tickets')
      ),
      // Issues — nested
      R('div',{style:{marginTop:'4px',marginLeft:'68px'}},
        row({prog:i1In,key:'KAN-1',summary:'Spike: evaluate options'}),
        row({prog:i2In,key:'KAN-2',summary:'Refactor auth flow'}),
        row({prog:i3In,key:'KAN-3',summary:'Login form rejects valid emails',tag:'Claude found',tagColor:'#10B981'}),
        row({prog:i4In,key:'KAN-4',summary:'Fix login form email validation',tag:'Claude made',tagColor:'#0084FF'})
      )
    ),

    // ─── RIGHT (40%): legend panel — uses a DIFFERENT example code
    //     (OPS) on purpose, so the viewer reads KAN as "just one possible
    //     short code" rather than something Atlassian-specific.
    R('div',{style:{position:'absolute',right:'80px',top:'230px',width:'620px'}},
      // Legend card 1 — what a project code is
      R('div',{style:{opacity:l1,transform:'translateY('+(10*(1-l1))+'px)',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'14px',padding:'22px 24px',boxShadow:'0 8px 22px rgba(17,25,40,0.05)'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{padding:'4px 12px',background:'#6366F1',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'18px',fontWeight:800,borderRadius:'6px'}},'OPS'),
          R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'= an example project code')
        ),
        R('div',{style:{marginTop:'10px',fontSize:'16px',color:'#6B7280',lineHeight:1.5}},'Three or four letters Jira assigns every project. Could be ENG, OPS, DATA, MOBILE — whatever your team picks.')
      ),
      // Legend card 2 — what a ticket key is
      R('div',{style:{marginTop:'18px',opacity:l2,transform:'translateY('+(10*(1-l2))+'px)',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'14px',padding:'22px 24px',boxShadow:'0 8px 22px rgba(17,25,40,0.05)'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{padding:'4px 12px',background:'#6366F1',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'18px',fontWeight:800,borderRadius:'6px'}},'OPS-7'),
          R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'= a ticket inside that project')
        ),
        R('div',{style:{marginTop:'10px',fontSize:'16px',color:'#6B7280',lineHeight:1.5}},'Every ticket gets the project code plus a number — OPS-7, OPS-42, etc. In our demo the project is ',
          R('span',{style:{color:'#0084FF',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'KAN'),
          ', so its tickets are ',
          R('span',{style:{color:'#10B981',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'KAN-3'),
          ', ',
          R('span',{style:{color:'#0084FF',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'KAN-4'),
          ', and so on.'
        )
      )
    ),

    // ─── BOTTOM ribbon: what else Claude can do with the same login ───
    //  Positioned high enough that the pill (below it) clears the FlowHunt
    //  watermark (the watermark layer sits at y≈994–1044; pill at bottom:160
    //  is at y≈920–970, ribbon at bottom:280 is at y≈760–840).
    rib>0.005?R('div',{style:{position:'absolute',left:'80px',right:'80px',bottom:'280px',opacity:rib,transform:'translateY('+(10*(1-rib))+'px)'}},
      R('div',{style:{fontSize:'13px',color:'#6B7280',fontWeight:700,letterSpacing:'0.08em',textAlign:'center',marginBottom:'14px'}},'WITH THE SAME LOGIN, CLAUDE CAN ALSO:'),
      R('div',{style:{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'nowrap'}},
        [{p:c1,t:'Search tickets'},{p:c2,t:'Make new tickets'},{p:c3,t:'Move them along'},{p:c4,t:'Add comments'},{p:c5,t:'Plan sprints'},{p:c6,t:'Write Confluence pages'}].map(function(o,i){
          return R('div',{key:i,style:{opacity:o.p,transform:'translateY('+(8*(1-o.p))+'px) scale('+(0.9+0.1*o.p)+')',padding:'12px 22px',background:'#FFFFFF',border:'1.5px solid #E5E7EB',borderRadius:'999px',fontSize:'17px',fontWeight:700,color:'#111928',whiteSpace:'nowrap',boxShadow:'0 4px 12px rgba(17,25,40,0.05)'}}, o.t);
        })
      )
    ):null,

    // ─── Narrator pill — moved up so it sits above the FlowHunt watermark ───
    pillP>0.005?R('div',{style:{position:'absolute',left:'50%',bottom:'160px',transform:'translateX(-50%) translateY('+(8*(1-pillP))+'px)',opacity:pillP,background:'#111928',color:'#FFFFFF',borderRadius:'999px',padding:'12px 28px',fontSize:'20px',fontWeight:700,boxShadow:'0 8px 22px rgba(17,25,40,0.20)',whiteSpace:'nowrap',zIndex:10}}, 'Know the code. Use the whole product.'):null
  );
}`;

/* ============================================================================
 * FlowHuntUsageScene (270f, 9s) - a scrolling chat-response panel showing
 * a FlowHunt Jira agent answering "what can this agent do with Atlassian?".
 *
 * Phase layout (frame-local):
 *   0–25     in: window fades + slides up from below
 *   25–55    hold at top of response (user prompt + H1 + intro + first list)
 *   55–180   slow eased scroll down to the bottom of the reply
 *   180–230  hold at bottom (How to Use Me + closing line)
 *   230–270  scene-out fade
 *
 * The "scroll" is implemented by translating an inner content div inside
 * an overflow:hidden viewport, NOT by relying on browser scroll behaviour.
 * ========================================================================== */
const FlowHuntUsageScene = `function FlowHuntUsageScene(props){${HELPERS}
  var f=props.frame||0;
  var END=270;
  var op=ease(cl(f/22))-easeIn(cl((f-(END-22))/22));

  // Window enters: fade + rise from below
  var inP=ease(cl(f/25));
  var rise=lerp(40, 0, inP);

  // Scroll: ease the content's translateY from 0 (top) to a negative value
  // (bottom) across frames 55–180. easeInOut keeps the motion calm at the
  // start and end so it feels like a mouse-scroll, not a snap-cut.
  var scrollT=easeInOut(cl((f-55)/125));
  // Content is taller now (ticket pull section stacked above the capability
  // list), so the scroll range extends further to keep the "How to Use Me"
  // example list landing inside the viewport at the bottom hold.
  var scrollY=lerp(0, -2080, scrollT);

  // Browser window geometry — this scene now renders inside a full Chrome
  // window so it visually reads as a real FlowHunt page (matches scenes 5–7).
  var browserW=1760, browserH=960;
  var browserX=(1920-browserW)/2;   // 80
  var browserY=60;
  var chromeChromeH=42;             // tabs row
  var urlBarH=44;                   // URL bar row
  // Chat window sits *inside* the browser body, slightly inset.
  var winW=1500, winH=820;
  var winX=browserX+(browserW-winW)/2;   // centred inside browser
  var winY=browserY+chromeChromeH+urlBarH+18;
  var headerH=46;
  var sidebarW=280;
  var inputBarH=72;
  var mainW=winW-sidebarW;    // 1220
  var mainH=winH-headerH;     // 774
  var viewportH=mainH-inputBarH; // 702

  // Small reusable bits ----------------------------------------------------
  function bullet(){
    return R('div',{style:{width:6,height:6,borderRadius:'50%',background:'#172B4D',marginTop:11,marginRight:14,flexShrink:0}});
  }
  function bulletItem(text){
    return R('div',{style:{display:'flex',alignItems:'flex-start',marginTop:8}},
      bullet(),
      R('div',{style:{fontSize:'18px',color:'#172B4D',lineHeight:1.55,flex:1}}, text)
    );
  }
  function numberedBlock(num, title, items){
    return R('div',{style:{marginTop:22}},
      R('div',{style:{fontSize:'22px',fontWeight:800,color:'#172B4D',lineHeight:1.35}}, num+'. '+title),
      R('div',{style:{marginTop:6}}, items.map(function(t,i){return R('div',{key:i},bulletItem(t));}))
    );
  }
  function h1(text){
    return R('div',{style:{fontSize:'36px',fontWeight:800,color:'#172B4D',letterSpacing:'-0.3px',lineHeight:1.2}}, text);
  }
  function h2(text){
    return R('div',{style:{marginTop:28,fontSize:'26px',fontWeight:800,color:'#172B4D',letterSpacing:'-0.2px',lineHeight:1.25}}, text);
  }
  function para(text, muted){
    return R('div',{style:{marginTop:10,fontSize:'18px',color:muted?'#6B7280':'#172B4D',lineHeight:1.6}}, text);
  }

  // FH blue square icon (used in window header + user bubble area)
  function fhSquare(size){
    var s=size||26;
    return R('div',{style:{width:s,height:s,borderRadius:'6px',background:grad,display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontFamily:'Inter,system-ui,sans-serif',fontSize:Math.round(s*0.55)+'px',boxShadow:'0 2px 6px rgba(0,82,204,0.30)'}}, 'J');
  }

  // User bubble at top of conversation (right-aligned, FH blue gradient)
  var userBubble=R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:24}},
    R('div',{style:{maxWidth:'72%',background:grad,color:'#FFFFFF',padding:'14px 20px',borderRadius:'18px 18px 4px 18px',fontSize:'18px',fontWeight:500,lineHeight:1.5,boxShadow:'0 6px 18px rgba(0,82,204,0.18)'}},
      'What tickets do I have open, and what can you do with my Atlassian workspace?'
    )
  );

  // Assistant reply card - the long scrollable content.
  // Two stacked sections so the same scroll motion reveals both:
  //   1) a real-looking ticket pull (anonymised project names)
  //   2) the capability list (the "what can I do" intro)
  var assistantCard=R('div',{style:{background:'#F4F5F7',borderRadius:'14px',padding:'34px 38px',color:'#172B4D'}},

    // ─── Section 1: live ticket pull ───────────────────────────────
    h1('Your open tickets'),
    para("Pulled from your yourcompany.atlassian.net Jira. None assigned to you, but there are 17 open tickets across two projects:"),

    h2('ENG - 3 open'),
    R('div',{style:{marginTop:8,marginBottom:18,paddingLeft:18,lineHeight:1.7,fontSize:18,color:'#172B4D'}},
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'ENG-4'),'  Sprint summary 2026-05-14  (To Do, Medium)'),
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'ENG-3'),'  Fix login form email validation  (In Progress)'),
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'ENG-1'),'  Refactor auth flow  (In Progress)')
    ),

    h2('OPS - 14 open  (sample)'),
    R('div',{style:{marginTop:8,marginBottom:18,paddingLeft:18,lineHeight:1.7,fontSize:18,color:'#172B4D'}},
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'OPS-7'),'  Conduct mid-program review'),
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'OPS-11'),'  Create personalized workout plan'),
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'OPS-5'),'  Plan next fitness program'),
      R('div',null,R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontWeight:700,color:'#0052CC'}},'OPS-15'),'  Gather user feedback')
    ),
    para('Want to narrow this down (e.g. only ENG, only In Progress, or filter by priority)?'),

    R('div',{style:{height:1,background:'#DFE1E6',margin:'26px 0 26px 0'}}),

    // ─── Section 2: the capability list (same scroll, no new motion) ─
    h1('What I Can Do Here and in Atlassian Jira'),
    para("I'm your assistant for managing Jira issues and projects. Here's what I can help you with:"),

    h2('Jira Issue Management'),

    numberedBlock(1,'Create Issues',[
      'Create new tasks, bugs, stories, epics, or sub-tasks',
      'Set summaries, descriptions, assignees, priorities, and labels',
      'Organize work in your Jira projects'
    ]),
    numberedBlock(2,'View & Search Issues',[
      'Get detailed information about specific issues',
      'Search for issues using JQL (Jira Query Language)',
      'Filter by project, status, assignee, priority, and more',
      'View comments and issue history'
    ]),
    numberedBlock(3,'Update Issues',[
      'Modify issue titles (summaries) and descriptions',
      'Change assignees',
      'Update priorities and labels',
      'Keep information current'
    ]),
    numberedBlock(4,'Transition Issues',[
      'Move issues between statuses (e.g., Open to In Progress to Done)',
      'Manage workflow progression',
      'Track issue lifecycle'
    ]),
    numberedBlock(5,'Add Comments',[
      'Comment on issues with Markdown support',
      'Create internal notes (visible only to agents)',
      'Collaborate with your team',
      'Document decisions and progress'
    ]),

    h2('How to Use Me'),
    para('Just tell me what you need. For example:'),
    R('div',{style:{marginTop:6}},
      bulletItem('"Create a bug for the login issue"'),
      bulletItem('"Show me all open tasks in project X"'),
      bulletItem('"Move issue ABC-123 to In Progress"'),
      bulletItem('"Add a comment to ABC-123"'),
      bulletItem('"Update the priority of ABC-123 to High"')
    ),
    R('div',{style:{marginTop:22,fontSize:'18px',color:'#172B4D',lineHeight:1.6,fontStyle:'italic'}},
      "I'll use the appropriate tools and get you accurate information from your Atlassian workspace. What would you like to do?"
    )
  );

  // The scrollable inner content stack: user bubble first, then assistant.
  var contentStack=R('div',{style:{padding:'30px 40px 40px 40px'}},
    userBubble,
    assistantCard
  );

  // ─── Render ────────────────────────────────────────────────────────────
  return R('div',{style:{width:'100%',height:'100%',background:'#EEF1F4',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Chrome browser window wrapping the whole FlowHunt page ─────
    R('div',{style:{position:'absolute',left:browserX+'px',top:browserY+'px',width:browserW+'px',height:browserH+'px',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.22)',border:'1px solid #D1D5DB',opacity:inP}},
      // Chrome chrome bar — traffic lights + tab
      R('div',{style:{height:chromeChromeH+'px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'32px',padding:'0 16px',background:'#F4F5F7',borderTopLeftRadius:'9px',borderTopRightRadius:'9px',display:'flex',alignItems:'center',gap:'9px',fontSize:'13px',color:'#172B4D',fontWeight:600}},
          fhSquare(14),
          R('span',null,'Jira agent · FlowHunt')
        )
      ),
      // URL bar
      R('div',{style:{height:urlBarH+'px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 16px',gap:'12px'}},
        R('div',{style:{display:'flex',gap:'12px',color:'#9AA0A6',fontSize:'16px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'7px 16px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'18px',fontSize:'13px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:7,height:7,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
          R('span',{style:{color:'#6B7280'}},'/agents/jira/chat')
        )
      ),
      // FlowHunt page-level header inside the browser
      R('div',{style:{height:'48px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 28px',gap:'14px'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{display:'flex',alignItems:'center',fontSize:'18px',fontWeight:800,letterSpacing:'-0.3px'}},
            R('span',{style:{color:'#111928'}},'Flow'),
            R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
          )
        ),
        R('div',{style:{marginLeft:'14px',fontSize:'13px',color:'#6B7280'}},'Agents'),
        R('div',{style:{fontSize:'13px',color:'#6B7280'}},'/'),
        R('div',{style:{fontSize:'13px',color:'#111928',fontWeight:700}},'Jira'),
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'12px',fontSize:'12px',color:'#6B7280'}},
          R('div',{style:{padding:'5px 11px',background:'#F4F5F7',borderRadius:'14px',fontWeight:600}},'Example Workspace')
        )
      )
    ),

    // ─── Chat window — sits inside the browser body ─────────────────
    R('div',{style:{position:'absolute',left:winX+'px',top:(winY+rise)+'px',width:winW+'px',height:winH+'px',background:'#FFFFFF',borderRadius:'14px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.18)',border:'1px solid #DFE1E6',opacity:inP}},

      // ── Top header bar ──
      R('div',{style:{height:headerH+'px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'12px'}},
        fhSquare(26),
        R('div',{style:{fontSize:'16px',fontWeight:700,color:'#172B4D'}},'Jira'),
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'14px',color:'#6B7280',fontSize:'18px'}},
          R('span',null,'↻'),
          R('span',{style:{fontSize:'16px',fontWeight:600}},'×')
        )
      ),

      // ── Body row: sidebar + main ──
      R('div',{style:{display:'flex',height:(winH-headerH)+'px'}},

        // Sidebar
        R('div',{style:{width:sidebarW+'px',background:'#FAFBFC',borderRight:'1px solid #DFE1E6',padding:'18px 14px',display:'flex',flexDirection:'column',gap:'14px'}},
          // Session dropdown chip
          R('div',{style:{padding:'10px 14px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'8px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#42526E',fontWeight:600}},
            // Tiny calendar glyph (rounded square with two top ticks)
            R('div',{style:{width:16,height:16,border:'1.5px solid #6B7280',borderRadius:'3px',position:'relative',flexShrink:0}},
              R('div',{style:{position:'absolute',left:2,top:-3,width:3,height:4,background:'#6B7280',borderRadius:'1px'}}),
              R('div',{style:{position:'absolute',right:2,top:-3,width:3,height:4,background:'#6B7280',borderRadius:'1px'}}),
              R('div',{style:{position:'absolute',left:2,right:2,top:5,height:1.5,background:'#6B7280'}})
            ),
            R('span',null,'Session'),
            R('span',{style:{marginLeft:'auto',color:'#9AA0A6',fontSize:'12px'}},'▾')
          ),
          // Highlighted entry: Current session
          R('div',{style:{padding:'10px 12px',background:'#EBECF0',borderRadius:'6px',fontSize:'14px',color:'#172B4D',fontWeight:600}},'Current session')
        ),

        // Main pane
        R('div',{style:{width:mainW+'px',position:'relative',background:'#FFFFFF'}},
          // Scrolling viewport (overflow clipped)
          R('div',{style:{position:'absolute',left:0,top:0,width:'100%',height:viewportH+'px',overflow:'hidden'}},
            R('div',{style:{transform:'translateY('+scrollY+'px)'}}, contentStack)
          ),

          // Sticky chat input bar at the bottom of the main pane
          R('div',{style:{position:'absolute',left:0,right:0,bottom:0,height:inputBarH+'px',background:'#FFFFFF',borderTop:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 22px',gap:'14px'}},
            // + icon
            R('div',{style:{width:34,height:34,borderRadius:'50%',background:'#F4F5F7',border:'1px solid #DFE1E6',display:'flex',alignItems:'center',justifyContent:'center',color:'#6B7280',fontSize:'20px',fontWeight:600,flexShrink:0}},'+'),
            R('div',{style:{flex:1,fontSize:'16px',color:'#9AA0A6'}},'Ask me any question...'),
            // Send arrow
            R('div',{style:{width:36,height:36,borderRadius:'50%',background:'#EBECF0',display:'flex',alignItems:'center',justifyContent:'center',color:'#6B7280',fontSize:'18px',fontWeight:700,flexShrink:0}},'↑')
          )
        )
      )
    )
  );
}`;


// FlowHuntOAuthScene — SCENE 5 (285f, 9.5s).
// Replaces the prior Claude-Code OAuth scene with the *actual* flow the user
// followed: integrating Atlassian into FlowHunt. The viewer learns that
// FlowHunt — not Claude Code itself — holds the Atlassian credentials.
//
// Choreography (mirrors InstallScene / FlowHuntSetupScene two-phase pattern):
//   Phase A (0–115):  FlowHunt Integrations page renders as a tall panel
//                     with the Atlassian (Token-based Auth) modal open in
//                     the centre. Around f=90 the "Integrate Atlassian"
//                     button gets a click flash.
//   Phase B (115–155): tall panel scales down + fades out while a Chrome
//                     browser window (same dims/markup as InstallScene)
//                     rises from below — URL: auth.atlassian.com/authorize
//   Phase C (155–230): full-size Chrome window holds the real Atlassian
//                     OAuth consent screen — FH↔Atlassian icon strip,
//                     centred header, three scope sections, Accept/Cancel.
//   Phase D (230–260): hold; Accept-button outer glow uses the same
//                     phase-continuous fast→slow pulse as InstallScene.
//                     At f=250 a small green "successfully integrated"
//                     toast slides in bottom-right.
//   Phase E (260–285): scene-out fade (matches InstallScene op formula).

const FlowHuntOAuthScene = `function FlowHuntOAuthScene(props){${HELPERS}
  var f=props.frame||0;
  var END=285;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Phase A: FlowHunt Integrations page + Atlassian modal ─────────
  var panelIn=ease(cl(f/24));
  // Modal body items reveal staggered
  function modalIn(d){return ease(cl((f-(28+d))/18));}
  var m1=modalIn(0), m2=modalIn(10), m3=modalIn(20), m4=modalIn(30), m5=modalIn(40);
  // Click flash on the Integrate button around f=90
  var clickFlash=cl(1-Math.abs(f-90)/8);

  // ─── Phase B: panel exit + chrome enter ─────────────────────────────
  var panelOut=easeIn(cl((f-115)/30));
  var panelOpacity=cl(panelIn-panelOut);
  var panelScale=1-0.06*panelOut;
  var panelShift=-30*panelOut;

  var chromeP=ease(cl((f-115)/40));
  var chromeRise=lerp(120, 0, chromeP);

  // ─── Phase C: OAuth content reveals ────────────────────────────────
  var iconStripP=ease(cl((f-155)/20));
  var headerP=ease(cl((f-168)/22));
  var useAppP=ease(cl((f-180)/18));
  function scopeIn(d){return ease(cl((f-(190+d))/20));}
  var s1=scopeIn(0), s2=scopeIn(14), s3=scopeIn(28);
  var footerP=ease(cl((f-216)/16));
  var btnP=ease(cl((f-220)/16));

  // ─── Phase D: Accept ring pulse (phase-integrated fast→slow) ───────
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-220)*fastFreq
    : (fastEnd-220)*fastFreq + (f-fastEnd)*slowFreq;
  var acceptPulse=0.5+0.5*Math.sin(pulsePhase);

  // ─── Success toast (bottom-right of Chrome) at f=250 ───────────────
  var toastP=ease(cl((f-250)/14));

  // Atlassian mark (PNG inlined via assets.mjs)
  function atlassianMark(size){
    var s=size||40;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block'}});
  }

  // FlowHunt mark — brand path + blue gradient
  function fhMark(size){
    var s=size||32;
    var uid=('fhoa'+Math.floor(s*1000));
    return R('svg',{width:s,height:s*(223/275),viewBox:'0 0 275 223',style:{display:'block'}},
      R('defs',null,
        R('linearGradient',{id:uid,x1:0,y1:0,x2:275,y2:223,gradientUnits:'userSpaceOnUse'},
          R('stop',{stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))
      ),
      R('path',{d:'${FH_MARK_PATH}',fill:'url(#'+uid+')'})
    );
  }

  // Reusable "row" inside a scope card: bold action verb + monospace scopes
  function scopeRow(action, scopes){
    return R('div',{style:{display:'flex',alignItems:'flex-start',gap:'10px',marginTop:'8px'}},
      R('div',{style:{minWidth:'72px',fontSize:'15px',fontWeight:600,color:'#172B4D'}}, action),
      R('div',{style:{flex:1,display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',color:'#42526E'}},
        R('span',{style:{color:'#9CA3AF',fontSize:'12px'}}, '›'),
        R('span',{style:{fontFamily:'JetBrains Mono,monospace',fontSize:'14px',color:'#172B4D'}}, scopes)
      )
    );
  }

  // A "section" of scopes for a product (Jira / Confluence / Service Desk)
  function scopeSection(args){
    var prog=args.prog, accent=args.accent, productLine=args.productLine, rows=args.rows, divider=args.divider;
    if(prog<0.005) return null;
    return R('div',{style:{opacity:prog,transform:'translateY('+(8*(1-prog))+'px)',paddingTop:'18px',paddingBottom:'18px',borderBottom:divider?'1px solid #DFE1E6':'none'}},
      R('div',{style:{display:'flex',alignItems:'flex-start',gap:'14px'}},
        // tiny product glyph
        R('div',{style:{width:'22px',height:'22px',marginTop:'2px',display:'flex',alignItems:'center',justifyContent:'center'}},
          R('div',{style:{width:'14px',height:'14px',background:accent,clipPath:'polygon(50% 0,100% 100%,0 100%)'}})
        ),
        R('div',{style:{flex:1}},
          R('div',{style:{fontSize:'16px',fontWeight:700,color:'#172B4D'}}, productLine),
          R('div',null,
            rows.map(function(r,i){ return R('div',{key:i}, scopeRow(r.action, r.scopes)); })
          )
        )
      )
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Header ─────────────────────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'70px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'CONNECT THE ACCOUNT'),
    R('div',{style:{position:'absolute',left:'50%',top:'108px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928'}},'FlowHunt holds the Atlassian credentials.'),

    // ─── Phase A: Integrations page panel with the modal open ───────
    panelOpacity>0.005?R('div',{style:{position:'absolute',left:'50%',top:'200px',width:'1600px',transform:'translateX(-50%) translateY('+panelShift+'px) scale('+panelScale+')',transformOrigin:'top center',background:'#FFFFFF',borderRadius:'14px',overflow:'hidden',boxShadow:'0 28px 60px rgba(17,25,40,0.18)',opacity:panelOpacity,border:'1px solid #E5E7EB',minHeight:'660px',position:'absolute'}},

      // Dimmed Integrations page behind the modal
      R('div',{style:{position:'absolute',inset:0,background:'#F9FAFB'}},
        // Top bar
        R('div',{style:{height:'56px',padding:'0 24px',borderBottom:'1px solid #E5E7EB',background:'#FFFFFF',display:'flex',alignItems:'center',gap:'12px'}},
          fhMark(22),
          R('div',{style:{fontSize:'15px',fontWeight:800,color:'#111928'}},'FlowHunt'),
          R('div',{style:{marginLeft:'24px',fontSize:'14px',color:'#6B7280'}},'Integrations')
        ),
        // Ghost cards row (so the modal feels like an overlay)
        R('div',{style:{padding:'30px 40px',display:'flex',gap:'18px'}},
          R('div',{style:{flex:1,height:'150px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',opacity:0.55,padding:'16px 18px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}}, atlassianMark(28), R('div',{style:{fontSize:'15px',fontWeight:700,color:'#172B4D'}},'Atlassian (OAuth)')),
            R('div',{style:{marginTop:'10px',fontSize:'12px',color:'#6B7280'}},'Integrate Atlassian to automate your Jira and Confluence processes.')
          ),
          R('div',{style:{flex:1,height:'150px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',opacity:0.55,padding:'16px 18px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}}, atlassianMark(28), R('div',{style:{fontSize:'15px',fontWeight:700,color:'#172B4D'}},'Atlassian (Token-based Auth)')),
            R('div',{style:{marginTop:'10px',fontSize:'12px',color:'#6B7280'}},'Integrate Atlassian to automate your Jira and Confluence processes.')
          )
        ),
        // Modal scrim
        R('div',{style:{position:'absolute',inset:0,background:'rgba(15,23,42,0.30)'}})
      ),

      // ─── The Atlassian (Token-based Auth) modal ────────────────────
      R('div',{style:{position:'absolute',left:'50%',top:'42px',transform:'translateX(-50%)',width:'1300px',background:'#FFFFFF',borderRadius:'14px',boxShadow:'0 30px 70px rgba(17,25,40,0.28)',overflow:'hidden',border:'1px solid #E5E7EB',opacity:panelIn}},

        // Two-column modal body
        R('div',{style:{display:'flex',minHeight:'560px'}},

          // Left column — instructions
          R('div',{style:{width:'410px',padding:'34px 32px',borderRight:'1px solid #E5E7EB',background:'#FFFFFF'}},
            R('div',{style:{display:'flex',alignItems:'flex-start',gap:'14px'}},
              atlassianMark(44),
              R('div',{style:{fontSize:'22px',fontWeight:800,color:'#111928',lineHeight:1.2,letterSpacing:'-0.3px'}},'Atlassian (Token-based Auth)')
            ),
            R('div',{style:{marginTop:'18px',fontSize:'13px',color:'#4B5563',lineHeight:1.55}},'Atlassian integration allows you to integrate Atlassian Jira and Confluence to your workspace.'),
            R('div',{style:{marginTop:'18px',fontSize:'13px',fontWeight:800,color:'#111928'}},'Key Features:'),
            R('div',{style:{marginTop:'10px',display:'flex',flexDirection:'column',gap:'10px',fontSize:'13px',color:'#4B5563',lineHeight:1.5}},
              R('div',{style:{opacity:m1,transform:'translateX('+((1-m1)*-8)+'px)',display:'flex',gap:'10px',alignItems:'flex-start'}},
                R('span',{style:{color:'#0084FF',marginTop:'4px',fontSize:'10px'}},'●'),
                R('div',null, R('span',{style:{fontWeight:700,color:'#172B4D'}},'Manage Jira Issues:'),' Create, update, and manage Jira issues directly from FlowHunt.')
              ),
              R('div',{style:{opacity:m2,transform:'translateX('+((1-m2)*-8)+'px)',display:'flex',gap:'10px',alignItems:'flex-start'}},
                R('span',{style:{color:'#0084FF',marginTop:'4px',fontSize:'10px'}},'●'),
                R('div',null, R('span',{style:{fontWeight:700,color:'#172B4D'}},'Manage Confluence Pages:'),' Create, update, and manage Confluence pages directly from FlowHunt.')
              ),
              R('div',{style:{opacity:m3,transform:'translateX('+((1-m3)*-8)+'px)',display:'flex',gap:'10px',alignItems:'flex-start'}},
                R('span',{style:{color:'#0084FF',marginTop:'4px',fontSize:'10px'}},'●'),
                R('div',null, R('span',{style:{fontWeight:700,color:'#172B4D'}},'Manage Jira Projects:'),' Create, update, and manage Jira projects directly from FlowHunt.')
              ),
              R('div',{style:{opacity:m4,transform:'translateX('+((1-m4)*-8)+'px)',display:'flex',gap:'10px',alignItems:'flex-start'}},
                R('span',{style:{color:'#0084FF',marginTop:'4px',fontSize:'10px'}},'●'),
                R('div',null, R('span',{style:{fontWeight:700,color:'#172B4D'}},'Manage Jira Boards:'),' Create, update, and manage Jira boards directly from FlowHunt.')
              )
            )
          ),

          // Right column — form
          R('div',{style:{flex:1,padding:'34px 36px',background:'#FFFFFF',display:'flex',flexDirection:'column',gap:'14px'}},

            // Tabs row (Configuration | Available Agents)
            R('div',{style:{display:'flex',gap:'24px',borderBottom:'1px solid #E5E7EB',marginBottom:'6px',paddingBottom:'8px'}},
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',fontWeight:700,color:'#0084FF',borderBottom:'2px solid #0084FF',paddingBottom:'4px',marginBottom:'-9px'}},
                R('span',{style:{fontSize:'12px'}},'⚙'), R('span',null,'Configuration')
              ),
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',fontWeight:600,color:'#6B7280',paddingBottom:'4px'}},
                R('span',{style:{fontSize:'12px'}},'☆'), R('span',null,'Available Agents')
              )
            ),

            // Header row: Atlassian icon + name + Not Connected pill + Self Hosted toggle
            R('div',{style:{marginTop:'4px',display:'flex',alignItems:'center',gap:'14px'}},
              atlassianMark(40),
              R('div',{style:{flex:1}},
                R('div',{style:{fontSize:'17px',fontWeight:800,color:'#111928'}},'Atlassian (Token-based Auth)'),
                R('div',{style:{display:'flex',alignItems:'center',gap:'6px',marginTop:'2px',fontSize:'12px',color:'#6B7280'}},
                  R('span',{style:{width:'8px',height:'8px',borderRadius:'50%',background:'#9CA3AF'}}), R('span',null,'Not Connected')
                )
              ),
              R('div',{style:{padding:'6px 12px',background:'#F3F4F6',border:'1px solid #D1D5DB',borderRadius:'6px',fontSize:'12px',fontWeight:600,color:'#4B5563'}},'Self Hosted')
            ),

            // API token instructions callout
            R('div',{style:{opacity:m1,padding:'14px 16px',background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'10px',fontSize:'12px',color:'#1E3A8A',lineHeight:1.55}},
              R('div',{style:{fontWeight:700,color:'#0052CC',marginBottom:'4px'}},'For Atlassian Cloud:'),
              R('div',null,'1. Visit ',R('span',{style:{fontFamily:'JetBrains Mono,monospace',color:'#0052CC'}},'id.atlassian.com/manage-profile/security/api-tokens')),
              R('div',null,'2. Click ',R('span',{style:{fontFamily:'JetBrains Mono,monospace',color:'#172B4D',fontWeight:700}},'"Create API token"')),
              R('div',null,'3. Give it a label e.g. ',R('span',{style:{fontFamily:'JetBrains Mono,monospace',color:'#172B4D',fontWeight:700}},'"FlowHunt Integration"')),
              R('div',null,'4. Copy the generated token and paste it below.')
            ),

            // Atlassian Domain
            R('div',{style:{opacity:m2}},
              R('div',{style:{fontSize:'12px',fontWeight:700,color:'#172B4D',marginBottom:'6px'}},'Atlassian Domain'),
              R('div',{style:{padding:'9px 12px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'13px',color:'#172B4D',fontFamily:'JetBrains Mono,monospace'}},'flowhunt.atlassian.net')
            ),

            // Email
            R('div',{style:{opacity:m3}},
              R('div',{style:{fontSize:'12px',fontWeight:700,color:'#172B4D',marginBottom:'6px'}},'Email'),
              R('div',{style:{padding:'9px 12px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'13px',color:'#172B4D',fontFamily:'JetBrains Mono,monospace'}},'you@example.com')
            ),

            // API Token (dots)
            R('div',{style:{opacity:m4}},
              R('div',{style:{fontSize:'12px',fontWeight:700,color:'#172B4D',marginBottom:'6px'}},'API Token'),
              R('div',{style:{padding:'9px 12px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'18px',color:'#172B4D',letterSpacing:'2px'}},'•••••••••••••••••••••••••••••••')
            ),

            // Buttons row
            R('div',{style:{marginTop:'6px',display:'flex',justifyContent:'flex-end',gap:'12px',opacity:m5}},
              R('div',{style:{padding:'10px 22px',background:'#FFFFFF',color:'#42526E',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'13px',fontWeight:700}},'Close'),
              R('div',{style:{padding:'10px 22px',background:'#0052CC',color:'#FFFFFF',borderRadius:'8px',fontSize:'13px',fontWeight:700,boxShadow:'0 0 0 '+(6*clickFlash)+'px rgba(0,82,204,0.25)'}},'Integrate Atlassian')
            )
          )
        )
      )
    ):null,

    // ─── Phase B/C: Chrome browser window (Atlassian OAuth consent) ──
    chromeP>0.005?R('div',{style:{position:'absolute',left:'50%',top:(200+chromeRise)+'px',width:'1500px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:chromeP,border:'1px solid #D1D5DB'}},

      // Chrome chrome bar — tabs row (same markup as InstallScene)
      R('div',{style:{height:'44px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'34px',padding:'0 18px',background:'#F4F5F7',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#172B4D',fontWeight:600}},
          atlassianMark(16),
          R('span',null,'Authorize - Atlassian')
        )
      ),

      // URL bar — green dot + host (matches InstallScene shape)
      R('div',{style:{height:'48px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'14px'}},
        R('div',{style:{display:'flex',gap:'14px',color:'#9AA0A6',fontSize:'18px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'8px 16px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'20px',fontSize:'14px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'auth.atlassian.com'),
          R('span',{style:{color:'#6B7280'}},'/authorize?client_id=flowhunt&audience=api.atlassian.com')
        )
      ),

      // ─── OAuth consent body ─────────────────────────────────────
      R('div',{style:{position:'relative',padding:'24px 48px',height:'688px',display:'flex',flexDirection:'column',alignItems:'center',background:'#FFFFFF'}},

        // Top-left: small Atlassian wordmark
        R('div',{style:{position:'absolute',left:'32px',top:'18px',display:'flex',alignItems:'center',gap:'8px'}},
          atlassianMark(22),
          R('div',{style:{fontSize:'20px',fontWeight:800,color:'#0052CC',letterSpacing:'-0.4px'}},'Atlassian')
        ),
        // Top-right: account avatar circle (HP)
        R('div',{style:{position:'absolute',right:'32px',top:'18px',width:'30px',height:'30px',borderRadius:'50%',background:'#42526E',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:700}},'HP'),

        // Icon strip: FH mark · arrows · Atlassian mark + MCP tag
        R('div',{style:{marginTop:'28px',display:'flex',alignItems:'center',gap:'14px',opacity:iconStripP,transform:'translateY('+(8*(1-iconStripP))+'px)'}},
          fhMark(30),
          // two-direction arrow glyph (drawn with two stacked arrows)
          R('div',{style:{display:'flex',flexDirection:'column',gap:'1px',color:'#42526E',fontSize:'12px',lineHeight:1,fontFamily:'monospace'}},
            R('span',null,'→'), R('span',null,'←')
          ),
          // Atlassian mark with a tiny MCP tag overlapping it
          R('div',{style:{position:'relative'}},
            atlassianMark(34),
            R('div',{style:{position:'absolute',right:'-12px',top:'-4px',padding:'1px 5px',background:'#0052CC',color:'#FFFFFF',fontSize:'9px',fontWeight:800,borderRadius:'3px',letterSpacing:'0.04em'}},'MCP')
          )
        ),

        // Centred header
        R('div',{style:{marginTop:'16px',textAlign:'center',maxWidth:'700px',opacity:headerP,transform:'translateY('+(8*(1-headerP))+'px)'}},
          R('div',{style:{fontSize:'30px',fontWeight:800,color:'#172B4D',letterSpacing:'-0.4px',lineHeight:1.25}},'FlowHunt is requesting access to your Atlassian account.')
        ),

        // Use app on / domain
        R('div',{style:{marginTop:'16px',textAlign:'center',opacity:useAppP}},
          R('div',{style:{fontSize:'12px',color:'#6B7280'}},'Use app on'),
          R('div',{style:{marginTop:'4px',fontSize:'14px',fontWeight:700,color:'#172B4D'}},'flowhunt.atlassian.net')
        ),

        // ─── Three scope sections (stacked, with dividers) ────────
        R('div',{style:{marginTop:'14px',width:'620px'}},
          // Section 1 — In Jira
          scopeSection({
            prog:s1, accent:'#2684FF', divider:true,
            productLine:'In Jira, it would like to:',
            rows:[
              {action:'Manage', scopes:'jira-project, jira-webhook'},
              {action:'View',   scopes:'jira-user, jira-work'},
              {action:'Update', scopes:'jira-work'}
            ]
          }),
          // Section 2 — In Confluence
          scopeSection({
            prog:s2, accent:'#0052CC', divider:true,
            productLine:'In Confluence, it would like to:',
            rows:[
              {action:'Delete', scopes:'Page'},
              {action:'View',   scopes:'Page, Space details, confluence-content.all, confluence-space.summary'},
              {action:'Update', scopes:'Page, confluence-content'},
              {action:'Search', scopes:'confluence'}
            ]
          }),
          // Section 3 — In Jira (servicedesk)
          scopeSection({
            prog:s3, accent:'#2684FF', divider:false,
            productLine:'In Jira, it would like to:',
            rows:[
              {action:'View',   scopes:'servicedesk-request'},
              {action:'Update', scopes:'servicedesk-request'}
            ]
          })
        ),

        // Footer legal text + button row
        footerP>0.005?R('div',{style:{marginTop:'14px',width:'620px',opacity:footerP}},
          R('div',{style:{paddingTop:'14px',borderTop:'1px solid #DFE1E6',fontSize:'11px',color:'#6B7280',lineHeight:1.55}},
            R('div',{style:{fontWeight:700,color:'#42526E'}},'By accepting this app, you:'),
            R('div',{style:{marginTop:'4px'}},'• Grant the app access to your data in all places you can access where the app is installed.'),
            R('div',null,'• Agree to AiMingle, s.r.o.\\'s ',R('span',{style:{color:'#0052CC'}},'privacy policy'),' and ',R('span',{style:{color:'#0052CC'}},'terms of use'),'.'),
            R('div',{style:{marginTop:'6px'}},'9 users have consented to using FlowHunt.')
          )
        ):null,

        // Accept / Cancel row (bottom-right)
        btnP>0.005?R('div',{style:{position:'absolute',right:'48px',bottom:'28px',display:'flex',alignItems:'center',gap:'18px',opacity:btnP,transform:'translateY('+(8*(1-btnP))+'px)'}},
          R('div',{style:{padding:'10px 24px',fontSize:'14px',fontWeight:700,color:'#FFFFFF',background:'#0052CC',borderRadius:'6px',boxShadow:'0 0 0 '+(4+10*acceptPulse)+'px rgba(0,82,204,0.20)'}},'Accept'),
          R('div',{style:{fontSize:'14px',fontWeight:600,color:'#0052CC'}},'Cancel')
        ):null,

        // ─── Success toast (bottom-right of Chrome) ──────────────
        toastP>0.005?R('div',{style:{position:'absolute',right:'24px',bottom:'88px',opacity:toastP,transform:'translateY('+(12*(1-toastP))+'px)',padding:'12px 16px',background:'#ECFDF5',border:'1px solid #10B981',borderRadius:'10px',display:'flex',alignItems:'center',gap:'12px',boxShadow:'0 10px 24px rgba(16,185,129,0.18)',minWidth:'380px'}},
          R('div',{style:{width:'26px',height:'26px',borderRadius:'50%',background:'#10B981',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'14px'}},'✓'),
          R('div',{style:{flex:1,fontSize:'13px',color:'#065F46',fontWeight:600,lineHeight:1.35}},'Atlassian (Token-based Auth) was successfully integrated')
        ):null
      )
    ):null
  );
}`;

// Produced: a single template-literal const named FlowHuntOAuthScene targeting
// the rendervid pattern used by InstallScene/FlowHuntSetupScene — five phases
// (A: FlowHunt Integrations + Atlassian Token-based modal with click flash,
// B: panel shrink/fade + Chrome rise, C: full Atlassian OAuth consent screen
// with FH↔Atlassian icon strip + three exact scope sections, D: phase-
// integrated fast→slow Accept pulse + green success toast at f=250,
// E: scene-out fade). Uses ${HELPERS}, ${ATLASSIAN_MARK} and
// ${FH_MARK_PATH} build-time placeholders; no other files modified.

// FlowHuntMcpServerScene — SCENE 6 (285f, 9.5s). REPLACES FlowHuntSetupScene.
//
// Viewer has just integrated Atlassian into FlowHunt (Scene 5). Now they wire up
// the Atlassian Jira MCP Server inside FlowHunt and copy the configuration JSON.
//
//   Phase A (0–115):  MCP Servers config modal renders as a tall content panel.
//                     Title bar at top: "Server name" + Active pill toggle.
//                     Two columns: LEFT (~38%) Select MCP Server with a search
//                     input that typewriters "atlassi", a Connected Servers (1)
//                     section with a blue-bordered Atlassian Jira MCP Server
//                     card showing "34 selected" + an up-arrow, plus an
//                     Available Servers (1) row for Atlassian Confluence MCP
//                     Server. RIGHT (~62%) shows the capabilities list which
//                     scrolls via transform:translateY inside overflow:hidden,
//                     revealing several tool rows. Around f=100 the server
//                     name field fills "Jira" (typewriter); around f=105 the
//                     blue Add MCP Server button gets a click flash.
//   Phase B (115–155): panel scales down + fades out, Chrome browser window
//                     rises from below (same dims + chrome bar markup as
//                     InstallScene).
//   Phase C (155–230): full-size Chrome window showing the Connect tab — the
//                     payoff. Client dropdown, blurb, MCP Client Configuration
//                     code card with syntax-coloured JSON + Copy button (click
//                     flash + "Copied" tooltip around f=200), yellow Caution
//                     callout, then a "Create preconfigured agent" card with
//                     the pulsing + Create AI Agent button.
//   Phase D (230–260): hold. + Create AI Agent outer glow uses the SAME
//                     phase-continuous fast→slow pulse pattern as InstallScene
//                     acceptPulse (fast 0.22 until f=230, then slow 0.085).
//   Phase E (260–285): scene-out fade.
//
// Output is a single template-literal const so build.mjs can inline it.

const FlowHuntMcpServerScene = `function FlowHuntMcpServerScene(props){${HELPERS}
  var f=props.frame||0;
  var END=285;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Phase A: MCP Servers config modal ──────────────────────────────
  var panelIn=ease(cl(f/22));

  // Left search input typewrites "atlassi" over the first ~35 frames.
  var searchTerm='atlassi';
  var searchStart=6, searchDur=28;
  var searchTyped=searchTerm.slice(0, Math.floor(cl((f-searchStart)/searchDur)*searchTerm.length));
  var searchCaret=f>=searchStart && (Math.floor((f-searchStart)/8))%2===0 && f<searchStart+searchDur+30;

  // Connected/Available card fade-ins (left column)
  var connHeadP=ease(cl((f-30)/18));
  var connCardP=ease(cl((f-40)/22));
  var availHeadP=ease(cl((f-58)/18));
  var availCardP=ease(cl((f-66)/22));

  // Right column reveal — header + first capability rows
  var rightHeadP=ease(cl((f-30)/18));
  var rightListP=ease(cl((f-40)/22));

  // Server-name field typewrites "Jira" around f=100
  var nameTerm='Jira';
  var nameStart=92, nameDur=18;
  var nameTyped=nameTerm.slice(0, Math.floor(cl((f-nameStart)/nameDur)*nameTerm.length));
  var nameCaret=f>=nameStart && (Math.floor((f-nameStart)/7))%2===0 && f<nameStart+nameDur+20;

  // Active toggle pill — fades in early and locks blue/on
  var activeP=ease(cl((f-12)/16));

  // Add MCP Server button click flash around f=105
  var addClickFlash=Math.max(0, 1-Math.abs(f-105)/8);

  // ─── Phase B: panel exit + chrome enter ────────────────────────────
  var panelOut=easeIn(cl((f-115)/30));
  var panelOpacity=cl(panelIn-panelOut);
  var panelScale=1-0.06*panelOut;
  var panelShift=-30*panelOut;

  var chromeP=ease(cl((f-115)/40));
  var chromeRise=lerp(120, 0, chromeP);

  // ─── Phase C: Connect tab content reveals ──────────────────────────
  var tabsP=ease(cl((f-155)/18));
  var clientP=ease(cl((f-162)/20));
  var blurbP=ease(cl((f-170)/22));
  var codeCardP=ease(cl((f-178)/22));
  var cautionP=ease(cl((f-200)/22));
  var agentCardP=ease(cl((f-210)/22));

  // Copy click flash + "Copied" tooltip around f=200
  var copyClickFlash=Math.max(0, 1-Math.abs(f-200)/8);
  var copiedTipP=ease(cl((f-200)/10))*(1-easeIn(cl((f-230)/22)));

  // ─── + Create AI Agent pulse — same fast→slow phase-integrated pattern
  //     as InstallScene's acceptPulse.
  var pulseStart=215;
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-pulseStart)*fastFreq
    : (fastEnd-pulseStart)*fastFreq + (f-fastEnd)*slowFreq;
  var agentPulse=0.5+0.5*Math.sin(pulsePhase);

  // Capability list scroll — translateY inside overflow:hidden viewport.
  // Scroll runs slowly across most of Phase A so the viewer sees ~5 rows pass.
  var scrollT=easeInOut(cl((f-10)/95));
  var scrollY=lerp(0, -360, scrollT);

  // Atlassian mark helper (matches InstallScene/FlowHuntSetupScene)
  function atlassianMark(size){
    var s=size||24;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block'}});
  }

  // ── Capability rows (right panel) — factually accurate to the screenshots
  var capabilities=[
    {name:'get_user_profile',     desc:'Get the user profile information for a specific user.'},
    {name:'get_issue',            desc:'Get detailed information about a Jira issue.'},
    {name:'search_issues',        desc:'Search Jira issues using JQL.'},
    {name:'create_issue',         desc:'Create a new Jira issue with summary, description, and fields.'},
    {name:'update_issue',         desc:'Update an existing Jira issue.'},
    {name:'batch_create_issues',  desc:'Create multiple issues in one call for efficiency.'},
    {name:'batch_update_issues',  desc:'Update multiple issues in a single call.'},
    {name:'transition_issue',     desc:'Move a Jira issue to a different status.'},
    {name:'delete_issue',         desc:'Delete a Jira issue.'},
    {name:'get_issue_comments',   desc:'Get comments for a specific Jira issue.'},
    {name:'add_comment',          desc:'Add a comment to a Jira issue.'},
    {name:'get_issue_worklogs',   desc:'Get worklog for a specific Jira issue.'},
    {name:'add_worklog',          desc:'Add a worklog entry to a Jira issue.'},
    {name:'get_board_issues',     desc:'Get issues for a specific board using JQL.'},
    {name:'get_sprint_issues',    desc:'Get issues in a specific sprint.'},
    {name:'get_projects',         desc:'Get list of Jira projects.'}
  ];

  // Tiny blue check chip used by every capability row
  function blueCheck(size){
    var s=size||18;
    return R('div',{style:{width:s,height:s,borderRadius:'4px',background:'#0084FF',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:Math.round(s*0.62)+'px',flexShrink:0}}, '✓');
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Header ─────────────────────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'70px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'IN FLOWHUNT · MCP SERVERS'),
    R('div',{style:{position:'absolute',left:'50%',top:'108px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928'}},'Wire up the Atlassian Jira MCP server.'),

    // ─── Phase A: MCP Servers config modal ──────────────────────────
    panelOpacity>0.005?R('div',{style:{position:'absolute',left:'50%',top:'190px',width:'1700px',transform:'translateX(-50%) translateY('+panelShift+'px) scale('+panelScale+')',transformOrigin:'top center',background:'#FFFFFF',borderRadius:'14px',overflow:'hidden',boxShadow:'0 28px 60px rgba(17,25,40,0.18)',opacity:panelOpacity,border:'1px solid #E5E7EB',display:'flex',flexDirection:'column',minHeight:'760px'}},

      // Top bar — Server name field + Active toggle
      R('div',{style:{padding:'20px 28px',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',gap:'20px'}},
        R('div',{style:{flex:1,display:'flex',alignItems:'center',gap:'14px'}},
          R('div',{style:{fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'0.06em'}},'SERVER NAME'),
          R('div',{style:{flex:1,maxWidth:'380px',padding:'10px 14px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'15px',color:'#111928',display:'flex',alignItems:'center'}},
            R('span',null, nameTyped),
            nameCaret?R('span',{style:{display:'inline-block',width:2,height:18,background:'#111928',marginLeft:1,verticalAlign:'middle'}}):null,
            nameTyped.length===0?R('span',{style:{color:'#9CA3AF'}},'Untitled MCP server'):null
          )
        ),
        // Active pill toggle (on, blue)
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px',opacity:activeP}},
          R('div',{style:{fontSize:'13px',fontWeight:600,color:'#111928'}},'Active'),
          R('div',{style:{width:42,height:24,borderRadius:'12px',background:'#0084FF',position:'relative',boxShadow:'0 1px 3px rgba(0,82,204,0.30)'}},
            R('div',{style:{position:'absolute',top:2,left:20,width:20,height:20,borderRadius:'50%',background:'#FFFFFF',boxShadow:'0 1px 2px rgba(0,0,0,0.15)'}})
          )
        )
      ),

      // Two-column body
      R('div',{style:{flex:1,display:'flex'}},

        // ── LEFT COLUMN (~38%) — Select MCP Server ──
        R('div',{style:{flex:'0 0 640px',padding:'24px 26px',borderRight:'1px solid #E5E7EB',display:'flex',flexDirection:'column',gap:'18px'}},

          R('div',{style:{fontSize:'18px',fontWeight:800,color:'#111928'}},'Select MCP Server'),

          // Search input (pre-filled "atlassi" via typewriter)
          R('div',{style:{padding:'12px 16px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'15px'}},
            R('span',{style:{color:'#9CA3AF',fontWeight:700}},'⌕'),
            R('span',{style:{color:'#111928'}}, searchTyped),
            searchCaret?R('span',{style:{display:'inline-block',width:2,height:18,background:'#111928',marginLeft:1,verticalAlign:'middle'}}):null,
            searchTyped.length===0?R('span',{style:{color:'#9CA3AF'}},'Search MCP servers'):null
          ),

          // Connected Servers (1)
          R('div',{style:{opacity:connHeadP,fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'0.06em',marginTop:'4px'}},'CONNECTED SERVERS (1)'),

          // Highlighted Atlassian Jira MCP Server card
          R('div',{style:{opacity:connCardP,transform:'translateY('+(8*(1-connCardP))+'px)',padding:'16px 18px',background:'#EFF6FF',border:'1.5px solid #0084FF',borderRadius:'12px',boxShadow:'0 6px 18px rgba(0,132,255,0.12)'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'14px'}},
              atlassianMark(28),
              R('div',{style:{flex:1,minWidth:0}},
                R('div',{style:{fontSize:'16px',fontWeight:800,color:'#111928'}},'Atlassian Jira MCP Server')
              ),
              // Integrated pill
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',padding:'4px 10px',background:'#DCFCE7',color:'#047857',fontSize:'11px',fontWeight:800,borderRadius:'999px'}},
                R('span',{style:{width:6,height:6,borderRadius:'50%',background:'#10B981',display:'inline-block'}}),
                R('span',null,'Integrated')
              ),
              // 34 selected + up-arrow
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',marginLeft:'4px',color:'#0084FF',fontSize:'12px',fontWeight:700}},
                R('span',null,'34 selected'),
                R('span',{style:{fontSize:'14px',lineHeight:1}},'▴')
              )
            ),
            R('div',{style:{marginTop:'10px',fontSize:'13px',color:'#4B5563',lineHeight:1.5}},'Atlassian Jira MCP Server Plugin for managing Jira instances and data.')
          ),

          // Available Servers (1)
          R('div',{style:{opacity:availHeadP,fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'0.06em',marginTop:'4px'}},'AVAILABLE SERVERS (1)'),

          // Confluence card (un-highlighted)
          R('div',{style:{opacity:availCardP,transform:'translateY('+(8*(1-availCardP))+'px)',padding:'16px 18px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'14px'}},
              atlassianMark(28),
              R('div',{style:{flex:1,minWidth:0}},
                R('div',{style:{fontSize:'16px',fontWeight:700,color:'#111928'}},'Atlassian Confluence MCP Server')
              ),
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',padding:'4px 10px',background:'#DCFCE7',color:'#047857',fontSize:'11px',fontWeight:800,borderRadius:'999px'}},
                R('span',{style:{width:6,height:6,borderRadius:'50%',background:'#10B981',display:'inline-block'}}),
                R('span',null,'Integrated')
              )
            )
          ),

          // Bottom row: Add MCP Server button (gets click flash around f=105)
          R('div',{style:{marginTop:'auto',display:'flex',justifyContent:'flex-end',paddingTop:'18px'}},
            R('div',{style:{position:'relative',padding:'12px 22px',background:'#0084FF',color:'#FFFFFF',fontSize:'14px',fontWeight:700,borderRadius:'10px',boxShadow:'0 6px 14px rgba(0,132,255,0.30)'}},
              R('span',null,'+ Add MCP Server'),
              addClickFlash>0.01?R('div',{style:{position:'absolute',inset:-6,borderRadius:'14px',border:'2px solid #0084FF',opacity:addClickFlash*0.7,pointerEvents:'none'}}):null
            )
          )
        ),

        // ── RIGHT COLUMN (~62%) — Capabilities ──
        R('div',{style:{flex:1,padding:'24px 28px',display:'flex',flexDirection:'column',gap:'14px',minWidth:0}},

          // Header
          R('div',{style:{opacity:rightHeadP,display:'flex',alignItems:'center',gap:'12px'}},
            atlassianMark(26),
            R('div',{style:{fontSize:'18px',fontWeight:800,color:'#111928'}},'Atlassian Jira MCP Server capabilities'),
            R('div',{style:{marginLeft:'auto',padding:'4px 10px',background:'#EFF6FF',color:'#0052CC',fontSize:'11px',fontWeight:800,borderRadius:'999px'}},'34 / 34 selected')
          ),

          // Scrolling viewport — translateY on inner content inside overflow:hidden
          R('div',{style:{flex:1,minHeight:0,position:'relative',overflow:'hidden',background:'#FAFAFB',border:'1px solid #E5E7EB',borderRadius:'12px',opacity:rightListP}},
            R('div',{style:{position:'absolute',left:0,right:0,top:0,padding:'14px 18px',transform:'translateY('+scrollY+'px)',display:'flex',flexDirection:'column',gap:'8px'}},
              capabilities.map(function(cap,i){
                return R('div',{key:i,style:{padding:'12px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'12px'}},
                  blueCheck(20),
                  R('div',{style:{flex:1,minWidth:0}},
                    R('div',{style:{fontSize:'14px',fontWeight:800,color:'#111928',fontFamily:'JetBrains Mono,monospace'}}, cap.name),
                    R('div',{style:{marginTop:'2px',fontSize:'12px',color:'#6B7280',lineHeight:1.4}}, cap.desc)
                  ),
                  R('div',{style:{padding:'3px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.04em'}},'ENABLED')
                );
              })
            ),
            // Soft top/bottom fades so rows feel like they're scrolling under a window
            R('div',{style:{position:'absolute',left:0,right:0,top:0,height:'20px',background:'linear-gradient(180deg,#FAFAFB,rgba(250,250,251,0))',pointerEvents:'none'}}),
            R('div',{style:{position:'absolute',left:0,right:0,bottom:0,height:'20px',background:'linear-gradient(0deg,#FAFAFB,rgba(250,250,251,0))',pointerEvents:'none'}})
          )
        )
      )
    ):null,

    // ─── Phase B/C: Chrome browser window (Connect tab) ─────────────
    chromeP>0.005?R('div',{style:{position:'absolute',left:'50%',top:(190+chromeRise)+'px',width:'1500px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:chromeP,border:'1px solid #D1D5DB'}},

      // Chrome chrome bar — tabs row (same markup as InstallScene)
      R('div',{style:{height:'44px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'34px',padding:'0 18px',background:'#F4F5F7',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#172B4D',fontWeight:600}},
          atlassianMark(14),
          R('span',null,'Jira MCP · FlowHunt')
        )
      ),

      // URL bar — green dot + host (matches InstallScene shape)
      R('div',{style:{height:'48px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'14px'}},
        R('div',{style:{display:'flex',gap:'14px',color:'#9AA0A6',fontSize:'18px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'8px 16px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'20px',fontSize:'14px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
          R('span',{style:{color:'#6B7280'}},'/mcp/jira/connect')
        )
      ),

      // Body — breadcrumb + tabs + content
      R('div',{style:{padding:'20px 32px 24px 32px',display:'flex',flexDirection:'column',gap:'14px',height:'688px',overflow:'hidden'}},

        // Breadcrumb + tabs
        R('div',{style:{display:'flex',flexDirection:'column',gap:'8px',opacity:tabsP}},
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:600}},
            R('span',null,'MCP Servers'),
            R('span',{style:{color:'#9CA3AF',margin:'0 6px'}},'>'),
            R('span',{style:{color:'#111928',fontWeight:700}},'Jira')
          ),
          R('div',{style:{display:'flex',gap:'22px',borderBottom:'1px solid #E5E7EB'}},
            R('div',{style:{padding:'8px 2px',fontSize:'14px',fontWeight:600,color:'#6B7280'}},'Configure'),
            R('div',{style:{padding:'8px 2px',fontSize:'14px',fontWeight:800,color:'#0084FF',borderBottom:'2px solid #0084FF',marginBottom:'-1px'}},'Connect')
          )
        ),

        // Two-row content area: top row = client + connect-blurb + code card,
        // bottom row = caution callout + create-agent card.
        R('div',{style:{display:'flex',gap:'22px',alignItems:'flex-start'}},

          // LEFT (~58%): client + blurb + code card
          R('div',{style:{flex:'0 0 820px',display:'flex',flexDirection:'column',gap:'14px'}},

            // Client dropdown
            R('div',{style:{opacity:clientP}},
              R('div',{style:{fontSize:'11px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em'}},'CLIENT'),
              R('div',{style:{marginTop:'6px',padding:'10px 14px',border:'1.5px solid #D1D5DB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px',background:'#FFFFFF',maxWidth:'320px'}},
                R('div',{style:{width:22,height:22,borderRadius:'5px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontSize:'11px'}},'F'),
                R('div',{style:{flex:1,fontSize:'13px',fontWeight:700,color:'#111928'}},'FlowHunt'),
                R('div',{style:{width:18,height:18,borderRadius:'50%',background:'#10B981',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'10px'}},'✓'),
                R('div',{style:{color:'#9CA3AF',fontSize:'12px'}},'▾')
              )
            ),

            // Connect to FlowHunt blurb
            R('div',{style:{opacity:blurbP}},
              R('div',{style:{fontSize:'18px',fontWeight:800,color:'#111928'}},'Connect to FlowHunt'),
              R('div',{style:{marginTop:'6px',fontSize:'12px',color:'#4B5563',lineHeight:1.55,maxWidth:'780px'}},
                'Connect your MCP Server to FlowHunt AI Agent and use it in your organization. Authentication uses an ',
                R('span',{style:{fontFamily:'JetBrains Mono,monospace',padding:'1px 5px',background:'#F3F4F6',borderRadius:'4px',color:'#111928'}},'Authorization: Bearer YOUR_API_KEY'),
                ' header - the URL itself never contains the secret.'
              )
            ),

            // MCP Client Configuration code card
            R('div',{style:{opacity:codeCardP,transform:'translateY('+(8*(1-codeCardP))+'px)'}},
              R('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}},
                R('div',{style:{fontSize:'11px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em'}},'MCP CLIENT CONFIGURATION'),
                R('div',{style:{fontSize:'11px',color:'#9CA3AF'}},'JSON')
              ),
              R('div',{style:{position:'relative',background:'#0F172A',borderRadius:'10px',padding:'18px 22px',fontFamily:'JetBrains Mono,monospace',fontSize:'13px',lineHeight:1.55,color:'#E2E8F0',boxShadow:'0 8px 22px rgba(15,23,42,0.20)'}},
                // Copy button top-right
                R('div',{style:{position:'absolute',top:'10px',right:'10px',padding:'6px 10px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.14)',borderRadius:'8px',color:'#E2E8F0',fontSize:'11px',fontWeight:600,display:'flex',alignItems:'center',gap:'6px'}},
                  R('div',{style:{width:12,height:12,border:'1.5px solid #E2E8F0',borderRadius:'2px',position:'relative'}},
                    R('div',{style:{position:'absolute',left:-3,top:-3,width:10,height:10,border:'1.5px solid #E2E8F0',borderRadius:'2px',background:'#0F172A'}})
                  ),
                  R('span',null,'Copy'),
                  copyClickFlash>0.01?R('div',{style:{position:'absolute',inset:-4,borderRadius:'10px',border:'2px solid #22D3EE',opacity:copyClickFlash*0.8,pointerEvents:'none'}}):null
                ),
                // "Copied" tooltip above the Copy button
                copiedTipP>0.01?R('div',{style:{position:'absolute',top:'-22px',right:'12px',padding:'4px 10px',background:'#111928',color:'#FFFFFF',fontSize:'11px',fontWeight:700,borderRadius:'6px',opacity:copiedTipP,boxShadow:'0 4px 10px rgba(0,0,0,0.30)'}},'Copied'):null,

                // JSON content — coloured
                R('div',null,R('span',{style:{color:'#E2E8F0'}},'{')),
                R('div',{style:{paddingLeft:'18px'}},
                  R('span',{style:{color:'#22D3EE'}},'"Jira"'),
                  R('span',{style:{color:'#E2E8F0'}},': {')
                ),
                R('div',{style:{paddingLeft:'36px'}},
                  R('span',{style:{color:'#94A3B8'}},'"transport"'),
                  R('span',{style:{color:'#E2E8F0'}},': '),
                  R('span',{style:{color:'#FBBF24'}},'"streamable_http"'),
                  R('span',{style:{color:'#E2E8F0'}},',')
                ),
                R('div',{style:{paddingLeft:'36px',wordBreak:'break-all'}},
                  R('span',{style:{color:'#94A3B8'}},'"url"'),
                  R('span',{style:{color:'#E2E8F0'}},': '),
                  R('span',{style:{color:'#FBBF24'}},'"https://mcp.flowhunt.io/ff978d0f-545d-4df4-9d51-85ec1a22a14b"'),
                  R('span',{style:{color:'#E2E8F0'}},',')
                ),
                R('div',{style:{paddingLeft:'36px'}},
                  R('span',{style:{color:'#94A3B8'}},'"headers"'),
                  R('span',{style:{color:'#E2E8F0'}},': {')
                ),
                R('div',{style:{paddingLeft:'54px'}},
                  R('span',{style:{color:'#94A3B8'}},'"Authorization"'),
                  R('span',{style:{color:'#E2E8F0'}},': '),
                  R('span',{style:{color:'#FBBF24'}},'"Bearer ********"')
                ),
                R('div',{style:{paddingLeft:'36px'}},R('span',{style:{color:'#E2E8F0'}},'}')),
                R('div',{style:{paddingLeft:'18px'}},R('span',{style:{color:'#E2E8F0'}},'}')),
                R('div',null,R('span',{style:{color:'#E2E8F0'}},'}'))
              )
            )
          ),

          // RIGHT (~42%): caution + create-agent card
          R('div',{style:{flex:1,display:'flex',flexDirection:'column',gap:'14px'}},

            // Caution callout (yellow)
            R('div',{style:{opacity:cautionP,transform:'translateY('+(8*(1-cautionP))+'px)',padding:'14px 16px',background:'#FEF9C3',border:'1px solid #FACC15',borderRadius:'10px',display:'flex',alignItems:'flex-start',gap:'12px'}},
              R('div',{style:{width:22,height:22,borderRadius:'50%',background:'#CA8A04',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'14px',flexShrink:0}},'!'),
              R('div',null,
                R('div',{style:{fontSize:'13px',fontWeight:800,color:'#713F12'}},'Caution'),
                R('div',{style:{marginTop:'3px',fontSize:'12px',color:'#713F12',lineHeight:1.5}},'Treat your MCP API key like a password. Anyone with this key can run tools attached to this server and access your data.')
              )
            ),

            // Create preconfigured agent card
            R('div',{style:{opacity:agentCardP,transform:'translateY('+(8*(1-agentCardP))+'px)',padding:'18px 18px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',boxShadow:'0 6px 18px rgba(17,25,40,0.06)'}},
              R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'Create preconfigured agent'),
              R('div',{style:{marginTop:'4px',fontSize:'12px',color:'#6B7280',lineHeight:1.5}},'Spin up a FlowHunt AI Agent already wired to this MCP server.'),
              R('div',{style:{marginTop:'14px',padding:'12px 14px',background:'#FAFBFC',border:'1px solid #E5E7EB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'12px'}},
                // Small FlowHunt logo tile
                R('div',{style:{width:30,height:30,borderRadius:'8px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontSize:'13px',flexShrink:0}},'FH'),
                R('div',{style:{flex:1,minWidth:0}},
                  R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'AI Agent with MCP'),
                  R('div',{style:{fontSize:'11px',color:'#6B7280'}},'Preconfigured with Jira tools')
                ),
                // The pulsing + Create AI Agent button
                R('div',{style:{padding:'9px 16px',background:'linear-gradient(90deg,#0084FF,#1A56DB)',color:'#FFFFFF',fontSize:'12px',fontWeight:800,borderRadius:'8px',boxShadow:'0 0 0 '+(3+10*agentPulse)+'px rgba(0,132,255,0.18), 0 6px 14px rgba(0,82,204,0.28)'}},'+ Create AI Agent')
              )
            )
          )
        )
      )
    ):null
  );
}`;

// 3-line summary
// FlowHuntMcpServerScene: a 285-frame Scene 6 replacement showing the FlowHunt MCP Servers config modal wiring up the Atlassian Jira MCP Server, then transitioning to the Connect tab in a Chrome browser window.
// Phase A panel renders a two-column layout (Select MCP Server with typewritten "atlassi" search + Connected/Available cards on the left, a translateY-scrolling 16-row capabilities list on the right), then types "Jira" into the server-name field and flashes the Add MCP Server button before scaling+fading out.
// Phase B/C/D/E mirror InstallScene's pattern: Chrome rises from below, the Connect tab reveals client dropdown + blurb + dark-themed MCP Client Configuration JSON card with Copy click flash + "Copied" tooltip, a yellow Caution callout, and a Create preconfigured agent card whose + Create AI Agent button uses InstallScene's phase-continuous fast→slow acceptPulse formula.

/* ============================================================================
 * FlowHuntBridgeScene (270f, 9s) — Scene 7.
 *
 * Two side-by-side surfaces both consume the same MCP server config:
 *   LEFT  — Claude Code terminal running `claude mcp add jira …`
 *   RIGHT — FlowHunt's browser, showing the agent editor with the
 *           Configure Tool: MCP Client dialog open (browser chrome
 *           with URL bar so it visually reads as "this is FlowHunt").
 *
 * No top JSON card and no branching arrows — the two surfaces are visible
 * from frame 0 with their identity labels above them, so the viewer reads
 * the local vs online distinction immediately.
 *
 * Phase layout (frame-local):
 *   0–30     A: page + both surfaces fade in together with labels at top
 *   30–230   B: terminal types Claude Code lines; FlowHunt dialog reveals
 *   230–260  C: hold; FlowHunt Save button outer glow pulses (fast→slow)
 *   260–270  D: scene-out fade
 *
 * HELPERS and CLAUDE_ICON are interpolated from the parent build.mjs scope.
 * ========================================================================== */

const FlowHuntBridgeScene = `function FlowHuntBridgeScene(props){${HELPERS}
  var f=props.frame||0;
  var END=270;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Surfaces fade in together ─────────────────────────────────────
  var surfP=ease(cl(f/22));
  var surfRise=18*(1-surfP);

  // ── LEFT terminal typewriter (unchanged from before, just earlier) ──
  var addCmd='claude mcp add jira --transport streamable_http https://mcp.flowhunt.io/ff978d0f-545d-4df4-9d51-85ec1a22a14b --header "Authorization: Bearer ********"';
  var addStart=20, addDur=80;
  var addTyped=addCmd.slice(0, Math.floor(cl((f-addStart)/addDur)*addCmd.length));
  var addCaret=f>=addStart && (Math.floor((f-addStart)/8))%2===0 && f<addStart+addDur+20;
  function lineAt(d,dur){return ease(cl((f-d)/(dur||10)));}
  var addedP=lineAt(115,14);
  var allowedP=lineAt(145,12);
  var listCmdP=lineAt(170,10);
  var listResP=lineAt(190,12);

  // ── RIGHT FlowHunt browser reveal staggers ──
  var browserP=surfP;            // browser appears with the left terminal
  var dialogP=ease(cl((f-30)/22));
  var advTogP=ease(cl((f-58)/16));
  var configP=ease(cl((f-78)/22));
  var btnsP=ease(cl((f-118)/16));

  // ─── Save-button pulse (fast→slow phase-integrated) ────────────────
  var pulseStart=200;
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-pulseStart)*fastFreq
    : (fastEnd-pulseStart)*fastFreq + (f-fastEnd)*slowFreq;
  var savePulse=0.5+0.5*Math.sin(pulsePhase);
  var pulseGate=cl((f-pulseStart)/14);

  // Layout — terminal stays small-ish; FlowHunt browser is bigger.
  // Caption labels live above each surface from frame 0.
  var captionY=170;
  var surfTopY=210;
  var termX=50,  termY=surfTopY, termW=820, termH=780;
  var fhX=900,   fhY=180,       fhW=960,  fhH=820;

  function span(t,c){return R('span',{style:{color:c}},t);}

  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op,overflow:'hidden'}},

    // ─── Header strip ───────────────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'62px',transform:'translateX(-50%)',fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'2px',opacity:surfP}},'TWO WAYS, ONE SERVER'),
    R('div',{style:{position:'absolute',left:'50%',top:'94px',transform:'translateX(-50%)',fontSize:'36px',fontWeight:800,color:'#111928',letterSpacing:'-0.4px',opacity:surfP}},'The same MCP. Local or online.'),

    // ─── Caption labels above each surface (from frame 0) ───────────
    R('div',{style:{position:'absolute',left:(termX+termW/2)+'px',top:captionY+'px',transform:'translateX(-50%) translateY('+(8*(1-surfP))+'px)',opacity:surfP,padding:'7px 18px',background:'linear-gradient(90deg,rgba(15,23,42,0.94),rgba(30,41,59,0.94))',color:'#F8FAFC',borderRadius:'999px',fontSize:'14px',fontWeight:700,whiteSpace:'nowrap',boxShadow:'0 8px 22px rgba(17,25,40,0.18)',display:'flex',alignItems:'center',gap:'10px',zIndex:10}},
      R('span',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E',display:'inline-block'}}),
      R('span',null,'Local: Claude Code')
    ),
    R('div',{style:{position:'absolute',left:(fhX+fhW/2)+'px',top:captionY+'px',transform:'translateX(-50%) translateY('+(8*(1-surfP))+'px)',opacity:surfP,padding:'7px 18px',background:'linear-gradient(90deg,#0084FF,#1A56DB)',color:'#FFFFFF',borderRadius:'999px',fontSize:'14px',fontWeight:700,whiteSpace:'nowrap',boxShadow:'0 8px 22px rgba(0,82,204,0.28)',display:'flex',alignItems:'center',gap:'10px',zIndex:10}},
      R('span',{style:{width:8,height:8,borderRadius:'50%',background:'#FFFFFF',display:'inline-block'}}),
      R('span',null,'Online: FlowHunt agent')
    ),

    // ─── LEFT — Claude Code terminal ────────────────────────────────
    surfP>0.005?R('div',{style:{position:'absolute',left:termX+'px',top:(termY+surfRise)+'px',width:termW+'px',height:termH+'px',background:'#0F172A',borderRadius:'12px',overflow:'hidden',boxShadow:'0 22px 50px rgba(17,25,40,0.22)',opacity:surfP}},
      R('div',{style:{height:'48px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:12,height:12,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'18px',display:'flex',alignItems:'center',gap:'10px',padding:'4px 11px',background:'rgba(217,119,87,0.14)',border:'1px solid rgba(217,119,87,0.40)',borderRadius:'8px'}},
          R('img',{src:'${CLAUDE_ICON}',style:{width:22,height:22,display:'block',borderRadius:'5px',boxShadow:'0 2px 5px rgba(217,119,87,0.35)'}}),
          R('div',{style:{fontSize:'13px',color:'#F8FAFC',fontWeight:700,letterSpacing:'-0.2px'}},'Claude Code')
        ),
        R('div',{style:{marginLeft:'10px',fontSize:'11px',color:'#64748B',fontFamily:'JetBrains Mono,monospace'}},'·  jira MCP')
      ),
      R('div',{style:{padding:'28px 30px',fontFamily:'JetBrains Mono,monospace',fontSize:'14px',lineHeight:1.6,color:'#E2E8F0'}},
        R('div',{style:{wordBreak:'break-all'}},
          span('$ ', '#22C55E'),
          R('span',null, addTyped),
          addCaret?R('span',{style:{display:'inline-block',width:8,height:16,background:'#E2E8F0',marginLeft:2,verticalAlign:'middle'}}):null
        ),
        addedP>0.01?R('div',{style:{marginTop:18,opacity:addedP,color:'#22C55E',wordBreak:'break-all'}},
          '✓ Added HTTP MCP server jira with URL: ',
          R('span',{style:{color:'#7DD3FC',textDecoration:'underline'}},'https://mcp.flowhunt.io/ff978d0f-545d-4df4-9d51-85ec1a22a14b')
        ):null,
        allowedP>0.01?R('div',{style:{marginTop:8,opacity:allowedP,color:'#94A3B8'}},
          'Allowed by auto agreed classifier'
        ):null,
        listCmdP>0.01?R('div',{style:{marginTop:24,opacity:listCmdP}},
          span('$ ', '#22C55E'),
          R('span',null,'claude mcp list | head -5')
        ):null,
        listResP>0.01?R('div',{style:{marginTop:12,opacity:listResP,display:'flex',alignItems:'center',gap:'16px'}},
          R('span',{style:{color:'#FBBF24',fontWeight:700}},'jira'),
          R('span',{style:{color:'#22C55E',fontWeight:700}},'✓ Connected'),
          R('span',{style:{color:'#E2E8F0'}},'34 tools')
        ):null
      )
    ):null,

    // ─── RIGHT — FlowHunt Chrome browser window ─────────────────────
    surfP>0.005?R('div',{style:{position:'absolute',left:fhX+'px',top:(fhY+surfRise)+'px',width:fhW+'px',height:fhH+'px',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 24px 56px rgba(17,25,40,0.22)',border:'1px solid #D1D5DB',opacity:surfP*browserP}},
      // Chrome chrome bar — tabs row
      R('div',{style:{height:'40px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:13,width:11,height:11,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:32,top:13,width:11,height:11,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:50,top:13,width:11,height:11,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'82px',height:'30px',padding:'0 16px',background:'#F4F5F7',borderTopLeftRadius:'8px',borderTopRightRadius:'8px',display:'flex',alignItems:'center',gap:'9px',fontSize:'12px',color:'#172B4D',fontWeight:600}},
          R('div',{style:{width:14,height:14,borderRadius:'3px',background:'linear-gradient(135deg,#0084FF,#1A56DB)'}}),
          R('span',null,'Jira agent · FlowHunt')
        )
      ),
      // URL bar
      R('div',{style:{height:'42px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 14px',gap:'12px'}},
        R('div',{style:{display:'flex',gap:'12px',color:'#9AA0A6',fontSize:'15px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'7px 14px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'18px',fontSize:'13px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:7,height:7,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
          R('span',{style:{color:'#6B7280'}},'/agents/jira/edit')
        )
      ),

      // Page body — agent editor backdrop (dotted grid) with the Configure Tool modal floating over it.
      R('div',{style:{position:'relative',height:'calc(100% - 82px)',background:'#F9FAFB',backgroundImage:'radial-gradient(circle, #D1D5DB 1px, transparent 1px)',backgroundSize:'18px 18px',overflow:'hidden'}},

        // Faded agent-canvas hint behind the modal (a single dashed node)
        R('div',{style:{position:'absolute',top:'24px',left:'50%',transform:'translateX(-50%)',width:'240px',padding:'12px 16px',background:'rgba(255,255,255,0.92)',border:'1.5px dashed #E11D74',borderRadius:'12px',display:'flex',alignItems:'center',gap:'10px',opacity:0.55}},
          R('div',{style:{width:22,height:22,borderRadius:'5px',background:'linear-gradient(135deg,#B91C5C,#E11D74)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'12px',fontWeight:800}},'★'),
          R('div',{style:{fontSize:'13px',fontWeight:700,color:'#111928'}},'AI Agent'),
          R('div',{style:{marginLeft:'auto',display:'flex',gap:'4px'}},
            R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#0052CC'}}),
            R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#0052CC'}}),
            R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#0052CC'}})
          )
        ),

        // Configure Tool: MCP Client modal floating in the page
        R('div',{style:{position:'absolute',left:'4%',right:'4%',top:'90px',bottom:'30px',background:'#FFFFFF',borderRadius:'14px',boxShadow:'0 24px 56px rgba(17,25,40,0.22)',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:dialogP}},
          // Outer modal title strip
          R('div',{style:{height:'44px',background:'#F9FAFB',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{width:22,height:22,borderRadius:'5px',background:'linear-gradient(135deg,#B91C5C,#E11D74)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'11px',fontWeight:800}},'★'),
              R('div',{style:{fontSize:'14px',fontWeight:700,color:'#111928'}},'Configure Tool: MCP Client')
            ),
            R('div',{style:{fontSize:'18px',color:'#9CA3AF',fontWeight:600,lineHeight:1}},'×')
          ),
          // Body
          R('div',{style:{padding:'22px 26px',display:'flex',flexDirection:'column',gap:'14px',flex:1,minHeight:0}},
            R('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between'}},
              R('div',{style:{fontSize:'19px',fontWeight:800,color:'#111928',letterSpacing:'-0.2px'}},'External MCP Servers'),
              R('div',{style:{display:'flex',alignItems:'center',gap:'10px',opacity:advTogP}},
                R('span',{style:{fontSize:'12px',fontWeight:600,color:'#4B5563'}},'Advanced Mode'),
                R('div',{style:{width:36,height:20,borderRadius:'10px',background:'#0084FF',padding:'2px',display:'flex',justifyContent:'flex-end',alignItems:'center'}},
                  R('div',{style:{width:16,height:16,borderRadius:'50%',background:'#FFFFFF',boxShadow:'0 1px 3px rgba(0,0,0,0.18)'}})
                )
              )
            ),
            R('div',{style:{fontSize:'13px',color:'#6B7280',lineHeight:1.45}},'Here you can add additional configuration fields like OAuth settings, custom headers, or other parameters.'),
            // MCP Configuration code card
            R('div',{style:{flex:1,minHeight:0,border:'1.5px solid #E5E7EB',borderRadius:'10px',background:'#FFFFFF',display:'flex',flexDirection:'column',overflow:'hidden',opacity:configP}},
              R('div',{style:{padding:'9px 14px',borderBottom:'1px solid #E5E7EB',background:'#F9FAFB',display:'flex',alignItems:'center',justifyContent:'space-between'}},
                R('div',{style:{display:'flex',alignItems:'center',gap:'8px'}},
                  R('div',{style:{width:6,height:6,borderRadius:'50%',background:'#10B981'}}),
                  R('div',{style:{fontSize:'12px',fontWeight:700,color:'#111928'}},'MCP Configuration')
                ),
                R('div',{style:{fontSize:'10px',color:'#6B7280',fontFamily:'JetBrains Mono,monospace'}},'JSON')
              ),
              R('div',{style:{flex:1,padding:'14px 18px',background:'#F9FAFB',fontFamily:'JetBrains Mono,monospace',fontSize:'13px',lineHeight:1.55,color:'#1F2937',overflow:'hidden'}},
                R('div',null, span('{','#6B7280')),
                R('div',{style:{paddingLeft:'14px'}},
                  span('"Jira"','#0084FF'), span(': {','#6B7280')
                ),
                R('div',{style:{paddingLeft:'28px'}},
                  span('"transport"','#0084FF'), span(': ','#6B7280'), span('"streamable_http"','#10B981'), span(',','#6B7280')
                ),
                R('div',{style:{paddingLeft:'28px',wordBreak:'break-all'}},
                  span('"url"','#0084FF'), span(': ','#6B7280'), span('"https://mcp.flowhunt.io/ff978d0f-545d-4df4-9d51-85ec1a22a14b"','#10B981'), span(',','#6B7280')
                ),
                R('div',{style:{paddingLeft:'28px'}},
                  span('"headers"','#0084FF'), span(': {','#6B7280')
                ),
                R('div',{style:{paddingLeft:'42px'}},
                  span('"Authorization"','#0084FF'), span(': ','#6B7280'), span('"Bearer ********"','#10B981')
                ),
                R('div',{style:{paddingLeft:'28px'}}, span('}','#6B7280')),
                R('div',{style:{paddingLeft:'14px'}}, span('}','#6B7280')),
                R('div',null, span('}','#6B7280'))
              )
            ),
            // Buttons row
            R('div',{style:{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'12px',opacity:btnsP}},
              R('div',{style:{padding:'10px 22px',fontSize:'14px',fontWeight:700,color:'#42526E',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'8px'}},'Cancel'),
              R('div',{style:{padding:'10px 30px',fontSize:'14px',fontWeight:700,color:'#FFFFFF',background:'#0084FF',borderRadius:'8px',boxShadow:'0 0 0 '+(2+10*savePulse*pulseGate)+'px rgba(0,132,255,0.22)'}},'Save')
            )
          )
        )
      )
    ):null
  );
}`;

/* ============================================================================
 * CTA scene - FlowHunt logo + blog title + button + URL.
 * ========================================================================== */
const CTAScene = `function CTAScene(props){${HELPERS}
  var f=props.frame||0;
  var logoP=ease(cl(f/22));
  var divP=ease(cl((f-22)/16));
  var titleP=ease(cl((f-38)/22));
  var subP=ease(cl((f-52)/22));
  var btnP=ease(cl((f-66)/22));
  var urlP=ease(cl((f-100)/24));
  var arrowNudge=Math.sin(cl((f-90)/40)*Math.PI*2)*3;
  var outP=easeIn(cl((f-(240-26))/26));
  var op=1-outP;
  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif',opacity:op}},
    R('div',{style:{opacity:logoP,transform:'translateY('+(12*(1-logoP))+'px)',display:'flex',alignItems:'center',gap:'18px',fontSize:'64px',fontWeight:800,letterSpacing:'-1px'}},
      R('svg',{width:66,height:53,viewBox:'0 0 275 223',fill:'none'},
        R('defs',null,R('linearGradient',{id:'fh_cta',x1:0,y1:0,x2:275,y2:223,gradientUnits:'userSpaceOnUse'},R('stop',{stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))),
        R('path',{d:'${FH_MARK_PATH}',fill:'url(#fh_cta)'})
      ),
      R('div',{style:{display:'flex'}},
        R('span',{style:{color:'#111928'}},'Flow'),
        R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
      )
    ),
    R('div',{style:{width:'200px',height:'1px',background:'#E5E7EB',marginTop:'32px',transform:'scaleX('+divP+')',transformOrigin:'center'}}),
    R('div',{style:{marginTop:'52px',textAlign:'center',opacity:titleP,transform:'translateY('+(12*(1-titleP))+'px)',maxWidth:'1500px'}},
      R('div',{style:{fontSize:'56px',fontWeight:800,color:'#111928',lineHeight:1.15,letterSpacing:'-1px'}},'How to Use Claude Code with ',R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'the Atlassian MCP server')),
      R('div',{style:{marginTop:'20px',fontSize:'26px',color:'#6B7280',opacity:subP}},'A complete setup guide')
    ),
    R('div',{style:{marginTop:'56px',width:'340px',height:'68px',borderRadius:'34px',background:grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',fontWeight:600,color:'#FFFFFF',opacity:btnP,transform:'scale('+(0.9+0.1*btnP)+')',boxShadow:'0 14px 30px rgba(0,132,255,0.35)'}},
      R('span',null,'Read the guide '),
      R('span',{style:{display:'inline-block',marginLeft:'8px',transform:'translateX('+arrowNudge+'px)'}},'→')
    ),
    R('div',{style:{marginTop:'48px',fontSize:'20px',fontWeight:500,color:'#6B7280',opacity:urlP}},'flowhunt.io/blog')
  );
}`;

/* ============================================================================
 * Watermark — bottom of every scene.
 * "Flow" auto-inverts on dark backgrounds (mix-blend-mode is not reliable in
 * the renderer; we keep the simple two-tone wordmark instead, slightly faded).
 * ========================================================================== */
const Watermark = `function Watermark(props){var R=React.createElement;
  return R('div',{style:{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.85,fontFamily:'Inter,system-ui,sans-serif',fontWeight:700,fontSize:'24px',letterSpacing:'-0.3px'}},
    R('span',{style:{color:'#111928'}},'Flow'),
    R('span',{style:{background:'linear-gradient(90deg,#0084FF,#1A56DB)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
  );
}`;

function scene(id, range, componentName, transition = { type: 'fade', duration: 18 }) {
  return {
    id,
    startFrame: range.start,
    endFrame: range.end,
    backgroundColor: '#FFFFFF',
    transition,
    layers: [
      { id: `${id}-layer`,     type: 'custom', position: { x: 0, y: 0 },    size: { width: 1920, height: 1080 }, customComponent: { name: componentName, props: {} } },
      { id: `${id}-watermark`, type: 'custom', position: { x: 0, y: 990  }, size: { width: 1920, height: 50 },   customComponent: { name: 'Watermark',    props: {} } },
    ],
  };
}

const template = {
  name: 'claude-code-jira-mcp',
  description: 'Motion-graphics promo for the FlowHunt blog "How to Use Claude Code with the Atlassian MCP server".',
  version: '1.0.0',
  output: { type: 'video', width: 1920, height: 1080, fps: FPS, duration: TOTAL_SECONDS, backgroundColor: '#FFFFFF' },
  customComponents: {
    PivotScene:            { type: 'inline', code: PivotScene },
    DemoScene:             { type: 'inline', code: DemoScene },
    ArchScene:             { type: 'inline', code: ArchScene },
    SnapshotScene:         { type: 'inline', code: SnapshotScene },
    FlowHuntOAuthScene:    { type: 'inline', code: FlowHuntOAuthScene },
    FlowHuntMcpServerScene:{ type: 'inline', code: FlowHuntMcpServerScene },
    FlowHuntBridgeScene:   { type: 'inline', code: FlowHuntBridgeScene },
    FlowHuntUsageScene:    { type: 'inline', code: FlowHuntUsageScene },
    CTAScene:              { type: 'inline', code: CTAScene },
    Watermark:             { type: 'inline', code: Watermark },
  },
  inputs: [],
  composition: {
    scenes: [
      scene('s1-pivot',      F.pivot,     'PivotScene'),
      scene('s2-explainer',  F.snapshot,  'SnapshotScene'),          // Project-code primer
      scene('s3-demo',       F.demo,      'DemoScene'),              // Claude Code bug-triage
      scene('s4-arch',       F.arch,      'ArchScene'),              // Architecture
      scene('s5-fh-oauth',   F.fhOAuth,   'FlowHuntOAuthScene'),     // FlowHunt + Atlassian OAuth
      scene('s6-fh-mcp',     F.fhMcp,     'FlowHuntMcpServerScene'), // MCP Server config + Connect JSON
      scene('s7-fh-bridge',  F.fhBridge,  'FlowHuntBridgeScene'),    // One JSON, two surfaces
      scene('s8-fh-usage',   F.fhUsage,   'FlowHuntUsageScene'),     // FlowHunt agent answering
      scene('s9-cta',        F.cta,       'CTAScene', { type: 'fade', duration: 26 }),
    ],
  },
};

writeFileSync(join(__dirname, 'template.json'), JSON.stringify(template, null, 2));
console.log('template.json written (' + template.composition.scenes.length + ' scenes, ' + template.output.duration + 's, ' + TOTAL_FRAMES + ' frames)');
