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
  snapshot:   { start: 90,   end: 330,   dur: 240 },  // 8s   — KAN explainer (plays 2nd)
  demo:       { start: 330,  end: 570,   dur: 240 },  // 8s   — bug-triage walkthrough at 2x
  arch:       { start: 570,  end: 730,   dur: 160 },  // ~5.3s
  install:    { start: 730,  end: 1015,  dur: 285 },  // 9.5s — Claude Code install + OAuth
  fhSetup:    { start: 1015, end: 1300,  dur: 285 },  // 9.5s — FlowHunt setup (parallel pattern to install)
  fhUsage:    { start: 1300, end: 1570,  dur: 270 },  // 9s   — FlowHunt agent in action (scroll)
  cta:        { start: 1570, end: 1810,  dur: 240 },  // 8s
};
const TOTAL_FRAMES = 1810;
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
        t3Url>0.01?R('div',{style:{opacity:t3Url,marginLeft:'24px',color:'#22D3EE',textDecoration:'underline'}},'project_name.atlassian.net/browse/KAN-4'):null
      )
    ),

    // RIGHT — Jira issue card preview
    cardIn>0.005?R('div',{style:{position:'absolute',right:'40px',top:'40px',width:'900px',height:'920px',background:'#FFFFFF',borderRadius:'10px',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',overflow:'hidden',opacity:cardIn}},
      // Jira chrome
      R('div',{style:{height:'46px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'10px'}},
        R('div',{style:{width:24,height:24,borderRadius:'4px',background:'#0052CC',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'14px',fontWeight:800}},'J'),
        R('div',{style:{fontSize:'13px',color:'#42526E'}},'project_name.atlassian.net / projects / KAN')
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
    if(kind==='term') return R('div',{style:{width:54,height:54,borderRadius:'12px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'22px',fontWeight:800}}, '>_');
    if(kind==='dot')  return R('div',{style:{width:54,height:54,borderRadius:'12px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'26px',fontWeight:800}}, '⏺');
    // Atlassian "A" mark
    return R('div',{style:{width:54,height:54,borderRadius:'12px',background:'#0052CC',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontFamily:'Inter,system-ui,sans-serif',fontSize:'28px',fontWeight:900}}, 'A');
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
 * SCENE 4 — Install (285f, 9.5s)
 *   Phase A (0–130): a tall terminal centred on screen, takes most of the
 *     vertical space. Command types in, result lands.
 *   Phase B (130–170): terminal scales down + fades out; a Chrome browser
 *     window slides up from the bottom, like a new tab popping open.
 *   Phase C (170–230): Chrome window full-size, Atlassian-branded OAuth
 *     consent screen reveals (header, rows, buttons). Accept button has
 *     a quick pulse so the viewer notices it.
 *   Phase D (230–265): hold — everything stays on screen and the Accept
 *     ring breathes in a slower rhythm so the viewer can take the panel
 *     in before we cut.
 *   Phase E (265–285): scene-out fade.
 * ========================================================================== */
const InstallScene = `function InstallScene(props){${HELPERS}
  var f=props.frame||0;
  var END=285;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Phase A: terminal ─────────────────────────────────────────────
  var termIn=ease(cl(f/24));
  var promptCmd='claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2';
  var typeStart=30, typeDur=72;
  var promptTyped=promptCmd.slice(0, Math.floor(cl((f-typeStart)/typeDur)*promptCmd.length));
  var caretOn=f>=typeStart && (Math.floor((f-typeStart)/8))%2===0 && f<typeStart+typeDur+30;
  var resultP=ease(cl((f-108)/16));

  // ─── Phase B: terminal exit + chrome enter ─────────────────────────
  var termOut=easeIn(cl((f-130)/30));
  var termOpacity=cl(termIn-termOut);
  var termScale=1-0.06*termOut;
  var termShift=-30*termOut;

  var chromeP=ease(cl((f-130)/40));
  var chromeRise=lerp(120, 0, chromeP);

  // ─── Phase C: OAuth content reveals ────────────────────────────────
  var headerP=ease(cl((f-170)/22));
  function rowIn(d){return ease(cl((f-(176+d))/18));}
  var r1=rowIn(0), r2=rowIn(14), r3=rowIn(28);
  var btnP=ease(cl((f-216)/16));
  // Accept ring pulse — fast/snappy when it first appears (so the viewer
  // notices it), then slows into a calmer breathe across the final held
  // second. Phase is integrated so there's no jump when the rate changes.
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-220)*fastFreq
    : (fastEnd-220)*fastFreq + (f-fastEnd)*slowFreq;
  var acceptPulse=0.5+0.5*Math.sin(pulsePhase);

  function span(t,c){return R('span',{style:{color:c}},t);}

  // The official Atlassian mark (PNG inlined via assets.mjs).
  function atlassianMark(size){
    var s=size||56;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block'}});
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Header ─────────────────────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'70px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'INSTALL'),
    R('div',{style:{position:'absolute',left:'50%',top:'108px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928'}},'One command. One OAuth click.'),

    // ─── Tall terminal (Phase A → fades during Phase B) ─────────────
    termOpacity>0.005?R('div',{style:{position:'absolute',left:'50%',top:'200px',width:'1600px',transform:'translateX(-50%) translateY('+termShift+'px) scale('+termScale+')',transformOrigin:'top center',background:'#0F172A',borderRadius:'14px',overflow:'hidden',boxShadow:'0 28px 60px rgba(17,25,40,0.25)',opacity:termOpacity}},
      R('div',{style:{height:'46px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 16px',gap:'10px'}},
        R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'14px',fontSize:'13px',color:'#94A3B8',fontFamily:'JetBrains Mono,monospace'}},'~  ·  zsh')
      ),
      R('div',{style:{padding:'60px 60px',fontFamily:'JetBrains Mono,monospace',fontSize:'26px',lineHeight:1.6,color:'#E2E8F0',minHeight:'440px'}},
        R('div',{style:{wordBreak:'break-all'}},
          span('$ ', '#22C55E'),
          R('span',null, promptTyped),
          caretOn?R('span',{style:{display:'inline-block',width:13,height:26,background:'#E2E8F0',marginLeft:2,verticalAlign:'middle'}}):null
        ),
        resultP>0.01?R('div',{style:{marginTop:34,opacity:resultP,color:'#22C55E'}},'✓ Added MCP server "atlassian" (http, OAuth 2.1)'):null,
        resultP>0.01?R('div',{style:{marginTop:14,opacity:resultP,color:'#94A3B8',fontSize:'22px'}},'opening browser to sign in...'):null
      )
    ):null,

    // ─── Chrome browser window (Phase B/C) ──────────────────────────
    chromeP>0.005?R('div',{style:{position:'absolute',left:'50%',top:(200+chromeRise)+'px',width:'1500px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:chromeP,border:'1px solid #D1D5DB'}},

      // Chrome chrome bar — tabs row
      R('div',{style:{height:'44px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'34px',padding:'0 18px',background:'#F4F5F7',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#172B4D',fontWeight:600}},
          atlassianMark(16),
          R('span',null,'Sign in to Atlassian')
        )
      ),

      // URL bar
      R('div',{style:{height:'48px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'14px'}},
        R('div',{style:{display:'flex',gap:'14px',color:'#9AA0A6',fontSize:'18px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'8px 16px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'20px',fontSize:'14px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E'}}),
          R('span',{style:{color:'#172B4D'}},'auth.atlassian.com'),
          R('span',{style:{color:'#6B7280'}},'/o/oauth2/authorize?client_id=claude-code&scope=read+search+write')
        )
      ),

      // Body — Atlassian OAuth consent
      R('div',{style:{padding:'60px 80px',display:'flex',flexDirection:'column',alignItems:'center'}},

        // Atlassian wordmark + logo
        R('div',{style:{display:'flex',alignItems:'center',gap:'14px',marginBottom:'40px',opacity:chromeP}},
          atlassianMark(56),
          R('div',{style:{fontSize:'32px',fontWeight:700,color:'#172B4D',letterSpacing:'-0.5px'}},'Atlassian')
        ),

        // Big header
        R('div',{style:{textAlign:'center',opacity:headerP,transform:'translateY('+(10*(1-headerP))+'px)'}},
          R('div',{style:{fontSize:'38px',fontWeight:800,color:'#172B4D',letterSpacing:'-0.4px'}},'Claude Code is requesting access'),
          R('div',{style:{marginTop:'10px',fontSize:'20px',color:'#6B7280'}},'to your Atlassian account')
        ),

        // Permission rows — bigger, with descriptions
        R('div',{style:{marginTop:'42px',width:'780px',display:'flex',flexDirection:'column',gap:'12px'}},
          R('div',{style:{opacity:r1,transform:'translateX('+((1-r1)*-14)+'px)',padding:'18px 22px',background:'#F4F5F7',border:'1px solid #DFE1E6',borderRadius:'10px',display:'flex',alignItems:'center',gap:'18px'}},
            R('div',{style:{width:32,height:32,borderRadius:'50%',background:'#0052CC',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'18px'}},'✓'),
            R('div',{style:{flex:1}},
              R('div',{style:{fontSize:'18px',fontWeight:700,color:'#172B4D'}},'Read your Jira and Confluence content'),
              R('div',{style:{marginTop:'2px',fontSize:'14px',color:'#6B7280'}},'View projects, issues, pages — like you would in the web app.')
            )
          ),
          R('div',{style:{opacity:r2,transform:'translateX('+((1-r2)*-14)+'px)',padding:'18px 22px',background:'#F4F5F7',border:'1px solid #DFE1E6',borderRadius:'10px',display:'flex',alignItems:'center',gap:'18px'}},
            R('div',{style:{width:32,height:32,borderRadius:'50%',background:'#0052CC',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'18px'}},'✓'),
            R('div',{style:{flex:1}},
              R('div',{style:{fontSize:'18px',fontWeight:700,color:'#172B4D'}},'Search across your workspace'),
              R('div',{style:{marginTop:'2px',fontSize:'14px',color:'#6B7280'}},'Run JQL and full-text searches over your tickets and pages.')
            )
          ),
          R('div',{style:{opacity:r3,transform:'translateX('+((1-r3)*-14)+'px)',padding:'18px 22px',background:'#F4F5F7',border:'1px solid #DFE1E6',borderRadius:'10px',display:'flex',alignItems:'center',gap:'18px'}},
            R('div',{style:{width:32,height:32,borderRadius:'50%',background:'#0052CC',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'18px'}},'✓'),
            R('div',{style:{flex:1}},
              R('div',{style:{fontSize:'18px',fontWeight:700,color:'#172B4D'}},'Create and update tickets'),
              R('div',{style:{marginTop:'2px',fontSize:'14px',color:'#6B7280'}},'File new Jira issues, leave comments, change status.')
            )
          )
        ),

        // Buttons row
        R('div',{style:{marginTop:'40px',width:'780px',display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'18px',opacity:btnP,transform:'translateY('+(8*(1-btnP))+'px)'}},
          R('div',{style:{padding:'14px 26px',fontSize:'16px',fontWeight:700,color:'#42526E',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'8px'}},'Cancel'),
          R('div',{style:{padding:'14px 36px',fontSize:'17px',fontWeight:700,color:'#FFFFFF',background:'#0052CC',borderRadius:'8px',boxShadow:'0 0 0 '+(4+10*acceptPulse)+'px rgba(0,82,204,0.18)'}},'Accept')
        )
      )
    ):null
  );
}`;

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
          R('div',{style:{fontSize:'18px',color:'#111928',fontWeight:700}},'project_name.atlassian.net')
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
 * SCENE 6 — CTA (240f, 8s) — FlowHunt brand + blog title + button + URL
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

// FlowHuntSetupScene — SCENE 5b (285f, 9.5s).
// Parallel to InstallScene: viewer has just seen Claude Code installed via
// terminal + OAuth Chrome. This scene shows the same thing in FlowHunt.
//   Phase A (0–130): FlowHunt Integrations page renders as a tall panel,
//     search input types "atlas", two Atlassian integration cards reveal.
//   Phase B (130–170): integrations panel scales down + fades out, Chrome
//     browser window rises from below (same dims/markup as InstallScene).
//   Phase C (170–230): full-size Chrome on app.flowhunt.io/agents/jira.
//     Agent builder: Chat Input → AI Agent → Chat Output canvas on the left,
//     config panel on the right. Six tool rows + six tool icons on the AI
//     Agent node fade in staggered.
//   Phase D (230–265): hold. Publish Agent button outer glow pulses
//     (phase-continuous fast→slow, same pattern as InstallScene acceptPulse).
//   Phase E (265–285): scene-out fade.
//
// Output is a single template-literal const so build.mjs can inline it.

const FlowHuntSetupScene = `function FlowHuntSetupScene(props){${HELPERS}
  var f=props.frame||0;
  var END=285;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Phase A: integrations panel ────────────────────────────────────
  var panelIn=ease(cl(f/24));
  var searchTerm='atlas';
  var typeStart=10, typeDur=30;
  var searchTyped=searchTerm.slice(0, Math.floor(cl((f-typeStart)/typeDur)*searchTerm.length));
  var searchCaret=f>=typeStart && (Math.floor((f-typeStart)/8))%2===0 && f<typeStart+typeDur+30;
  var clearPillP=ease(cl((f-44)/16));
  var card1P=ease(cl((f-60)/20));   // OAuth (Integrated) card
  var card2P=ease(cl((f-78)/20));   // Token-based card

  // ─── Phase B: panel exit + chrome enter ────────────────────────────
  var panelOut=easeIn(cl((f-130)/30));
  var panelOpacity=cl(panelIn-panelOut);
  var panelScale=1-0.06*panelOut;
  var panelShift=-30*panelOut;

  var chromeP=ease(cl((f-130)/40));
  var chromeRise=lerp(120, 0, chromeP);

  // ─── Phase C: agent builder reveals ─────────────────────────────────
  var toolbarP=ease(cl((f-170)/18));
  var canvasP=ease(cl((f-176)/22));
  var panelHeadP=ease(cl((f-184)/18));
  // 6 tool rows + 6 AI Agent node tool icons, staggered from f=180
  function toolIn(d){return ease(cl((f-(180+d))/16));}
  var t1=toolIn(0), t2=toolIn(10), t3=toolIn(20), t4=toolIn(30), t5=toolIn(40), t6=toolIn(50);

  // ─── Publish Agent pulse — same fast→slow phase-integrated pattern
  //     as InstallScene's acceptPulse so the cadence reads consistent.
  var pubStart=200;
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-pubStart)*fastFreq
    : (fastEnd-pubStart)*fastFreq + (f-fastEnd)*slowFreq;
  var pubPulse=0.5+0.5*Math.sin(pulsePhase);
  var pubBtnP=ease(cl((f-188)/18));

  // ─── Atlassian mark — official PNG inlined via assets.mjs ──
  function atlassianMark(size){
    var s=size||20;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block'}});
  }

  // FlowHunt mark — uses the brand path, gradient fill.
  function fhMark(size){
    var s=size||32;
    var uid=('fh'+Math.floor(s*1000));
    return R('svg',{width:s,height:s*(223/275),viewBox:'0 0 275 223',style:{display:'block'}},
      R('defs',null,
        R('linearGradient',{id:uid,x1:0,y1:0,x2:275,y2:223,gradientUnits:'userSpaceOnUse'},
          R('stop',{stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))
      ),
      R('path',{d:'${FH_MARK_PATH}',fill:'url(#'+uid+')'})
    );
  }

  // Tool rows (right panel)
  var tools=[
    {label:'Add Jira Comment',  p:t1},
    {label:'Create Jira Issue', p:t2},
    {label:'Get Jira Issue',    p:t3},
    {label:'List Jira Issues',  p:t4},
    {label:'Transition Jira Issue', p:t5},
    {label:'Update Jira Issue', p:t6}
  ];

  // Sidebar nav items — Integrations highlighted
  var navItems=[
    {label:'Home',           active:false},
    {label:'Agents Library', active:false},
    {label:'My Agents',      active:false},
    {label:'MCP Servers',    active:false},
    {label:'Chatbots',       active:false},
    {label:'History',        active:false},
    {label:'Integrations',   active:true}
  ];

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Header ─────────────────────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'70px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'IN FLOWHUNT'),
    R('div',{style:{position:'absolute',left:'50%',top:'108px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928'}},'One click. One agent. Same Jira tools.'),

    // ─── Phase A: Integrations page panel ───────────────────────────
    panelOpacity>0.005?R('div',{style:{position:'absolute',left:'50%',top:'200px',width:'1600px',transform:'translateX(-50%) translateY('+panelShift+'px) scale('+panelScale+')',transformOrigin:'top center',background:'#FFFFFF',borderRadius:'14px',overflow:'hidden',boxShadow:'0 28px 60px rgba(17,25,40,0.18)',opacity:panelOpacity,border:'1px solid #E5E7EB',display:'flex',minHeight:'620px'}},

      // Left sidebar
      R('div',{style:{width:'260px',background:'#F9FAFB',borderRight:'1px solid #E5E7EB',padding:'22px 18px',display:'flex',flexDirection:'column',gap:'18px'}},
        // FlowHunt logo + wordmark
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
          fhMark(28),
          R('div',{style:{display:'flex',fontSize:'19px',fontWeight:800,letterSpacing:'-0.3px'}},
            R('span',{style:{color:'#111928'}},'Flow'),
            R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
          )
        ),
        // Workspace block
        R('div',{style:{padding:'10px 12px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'8px',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:30,height:30,borderRadius:'7px',background:grad,color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'13px'}},'CS'),
          R('div',{style:{flex:1,minWidth:0}},
            R('div',{style:{fontSize:'13px',fontWeight:700,color:'#111928'}},'Chris Space'),
            R('div',{style:{fontSize:'10px',color:'#6B7280',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},'vzeman@qualityunit.com')
          )
        ),
        // Agent heading
        R('div',{style:{fontSize:'10px',fontWeight:700,color:'#9CA3AF',letterSpacing:'0.1em',marginTop:'4px'}},'AGENT'),
        // Nav rail
        R('div',{style:{display:'flex',flexDirection:'column',gap:'2px'}},
          navItems.map(function(it,i){
            return R('div',{key:i,style:{padding:'8px 12px',borderRadius:'6px',fontSize:'13px',fontWeight:it.active?700:500,color:it.active?'#111928':'#4B5563',background:it.active?'#E5E7EB':'transparent'}}, it.label);
          })
        ),
        // Knowledge sources heading
        R('div',{style:{fontSize:'10px',fontWeight:700,color:'#9CA3AF',letterSpacing:'0.1em',marginTop:'8px'}},'KNOWLEDGE SOURCES'),
        R('div',{style:{padding:'6px 12px',fontSize:'13px',color:'#9CA3AF'}},'Files'),
        // Workspace heading
        R('div',{style:{fontSize:'10px',fontWeight:700,color:'#9CA3AF',letterSpacing:'0.1em',marginTop:'6px'}},'WORKSPACE'),
        R('div',{style:{padding:'6px 12px',fontSize:'13px',color:'#9CA3AF'}},'Settings')
      ),

      // Main pane
      R('div',{style:{flex:1,padding:'34px 40px'}},
        // Title
        R('div',{style:{fontSize:'32px',fontWeight:800,color:'#111928',letterSpacing:'-0.4px'}},'Integrations'),
        R('div',{style:{marginTop:'6px',fontSize:'14px',color:'#6B7280'}},'Connect FlowHunt to the tools your team already uses.'),

        // Search row
        R('div',{style:{marginTop:'24px',display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{flex:1,maxWidth:'520px',padding:'12px 18px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'15px'}},
            R('span',{style:{color:'#9CA3AF',fontWeight:700}},'⌕'),
            R('span',{style:{color:'#111928'}}, searchTyped),
            searchCaret?R('span',{style:{display:'inline-block',width:2,height:18,background:'#111928',marginLeft:1,verticalAlign:'middle'}}):null,
            searchTyped.length===0?R('span',{style:{color:'#9CA3AF'}},'Search integrations'):null
          ),
          clearPillP>0.01?R('div',{style:{opacity:clearPillP,transform:'translateX('+((1-clearPillP)*-6)+'px)',padding:'8px 14px',background:'#F3F4F6',border:'1px solid #D1D5DB',borderRadius:'999px',fontSize:'13px',fontWeight:600,color:'#4B5563',display:'flex',alignItems:'center',gap:'6px'}},
            R('span',null,'Clear filters'),
            R('span',{style:{color:'#9CA3AF'}},'×')
          ):null
        ),

        // Cards row
        R('div',{style:{marginTop:'28px',display:'flex',gap:'18px'}},
          // Left card — OAuth, Integrated (selected/active blue)
          R('div',{style:{opacity:card1P,transform:'translateY('+(10*(1-card1P))+'px)',flex:1,padding:'22px 24px',background:'#EFF6FF',border:'1.5px solid #0084FF',borderRadius:'12px',position:'relative',boxShadow:'0 6px 18px rgba(0,132,255,0.12)'}},
            // BETA pill
            R('div',{style:{position:'absolute',top:'14px',right:'16px',padding:'3px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.06em'}},'BETA'),
            // Logo + title
            R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
              atlassianMark(34),
              R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928'}},'Atlassian (OAuth)')
            ),
            R('div',{style:{marginTop:'12px',fontSize:'13px',color:'#4B5563',lineHeight:1.5}},'Integrate Atlassian to automate your Jira and Confluence processes.'),
            // Footer row
            R('div',{style:{marginTop:'18px',display:'flex',alignItems:'center',justifyContent:'space-between'}},
              R('div',{style:{padding:'10px 18px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',fontWeight:700,borderRadius:'8px'}},'Manage Integration'),
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',color:'#047857',fontSize:'13px',fontWeight:700}},
                R('span',{style:{width:8,height:8,borderRadius:'50%',background:'#10B981',display:'inline-block'}}),
                R('span',null,'Integrated')
              )
            )
          ),
          // Right card — Token-based
          R('div',{style:{opacity:card2P,transform:'translateY('+(10*(1-card2P))+'px)',flex:1,padding:'22px 24px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',position:'relative'}},
            R('div',{style:{position:'absolute',top:'14px',right:'16px',padding:'3px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.06em'}},'BETA'),
            R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
              atlassianMark(34),
              R('div',{style:{fontSize:'18px',fontWeight:700,color:'#111928'}},'Atlassian (Token-based Auth)')
            ),
            R('div',{style:{marginTop:'12px',fontSize:'13px',color:'#4B5563',lineHeight:1.5}},'Integrate Atlassian to automate your Jira and Confluence processes.'),
            R('div',{style:{marginTop:'18px',display:'flex',alignItems:'center'}},
              R('div',{style:{padding:'10px 18px',background:'#FFFFFF',color:'#111928',fontSize:'13px',fontWeight:700,borderRadius:'8px',border:'1.5px solid #D1D5DB'}},'Integrate')
            )
          )
        )
      )
    ):null,

    // ─── Phase B/C: Chrome browser window (agent builder) ───────────
    chromeP>0.005?R('div',{style:{position:'absolute',left:'50%',top:(200+chromeRise)+'px',width:'1500px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:chromeP,border:'1px solid #D1D5DB'}},

      // Chrome chrome bar — tabs row (same markup as InstallScene)
      R('div',{style:{height:'44px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'34px',padding:'0 18px',background:'#F4F5F7',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#172B4D',fontWeight:600}},
          fhMark(14),
          R('span',null,'Jira agent · FlowHunt')
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
          R('span',{style:{color:'#6B7280'}},'/agents/jira')
        )
      ),

      // Top toolbar strip inside the page
      R('div',{style:{height:'52px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 22px',gap:'14px',opacity:toolbarP}},
        // Left: Agents / Jira pill
        R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{fontSize:'13px',color:'#0084FF',fontWeight:600}},'Agents'),
          R('div',{style:{color:'#9CA3AF',fontSize:'13px'}},'/'),
          R('div',{style:{padding:'4px 10px',background:'#F3F4F6',border:'1px solid #E5E7EB',borderRadius:'6px',fontSize:'12px',fontWeight:700,color:'#111928'}},'Jira')
        ),
        // Centre: Edit | Run | Batch segmented
        R('div',{style:{flex:1,display:'flex',justifyContent:'center'}},
          R('div',{style:{display:'flex',background:'#F3F4F6',border:'1px solid #E5E7EB',borderRadius:'8px',padding:'3px',gap:'2px'}},
            R('div',{style:{padding:'6px 16px',background:'#FFFFFF',borderRadius:'6px',fontSize:'12px',fontWeight:700,color:'#111928',boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}},'Edit'),
            R('div',{style:{padding:'6px 16px',fontSize:'12px',fontWeight:600,color:'#6B7280'}},'Run'),
            R('div',{style:{padding:'6px 16px',fontSize:'12px',fontWeight:600,color:'#6B7280'}},'Batch')
          )
        ),
        // Right: History / Version / Publish
        R('div',{style:{display:'flex',alignItems:'center',gap:'14px'}},
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:600}},'History'),
          R('div',{style:{fontSize:'12px',color:'#9CA3AF'}},'|'),
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:600}},'Version: 2'),
          R('div',{style:{opacity:pubBtnP,padding:'8px 18px',background:'#B91C5C',color:'#FFFFFF',fontSize:'13px',fontWeight:700,borderRadius:'8px',boxShadow:'0 0 0 '+(2+8*pubPulse)+'px rgba(225,29,116,0.22)'}},'Publish Agent')
        )
      ),

      // Body — canvas (left ~60%) + config panel (right ~40%)
      R('div',{style:{display:'flex',height:'636px'}},

        // ─── Canvas ───
        R('div',{style:{flex:'0 0 900px',background:'#FAFAFB',position:'relative',overflow:'hidden',opacity:canvasP}},
          // dotted grid background (subtle)
          R('div',{style:{position:'absolute',inset:0,backgroundImage:'radial-gradient(#E5E7EB 1px, transparent 1px)',backgroundSize:'18px 18px',opacity:0.6}}),

          // Three vertical nodes — centred at x≈450 of 900
          // Node 1: Chat Input (top, y≈40-140)
          R('div',{style:{position:'absolute',left:'50%',top:'40px',transform:'translateX(-50%)',width:'320px',background:'#FFFFFF',border:'1.5px solid #E5E7EB',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'14px',boxShadow:'0 6px 14px rgba(17,25,40,0.06)'}},
            R('div',{style:{width:38,height:38,borderRadius:'9px',background:'linear-gradient(135deg,#10B981,#047857)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'18px',fontWeight:800}},'➔'),
            R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'Chat Input')
          ),
          // Connector 1: dashed line + plus marker between Chat Input and AI Agent
          R('div',{style:{position:'absolute',left:'50%',top:'120px',width:'2px',height:'70px',transform:'translateX(-50%)',borderLeft:'2px dashed #9CA3AF'}}),
          R('div',{style:{position:'absolute',left:'50%',top:'148px',transform:'translate(-50%,-50%)',width:'26px',height:'26px',borderRadius:'50%',background:'#0084FF',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'18px',boxShadow:'0 4px 10px rgba(0,132,255,0.30)'}},'+'),

          // Node 2: AI Agent (middle, y≈200-360)
          R('div',{style:{position:'absolute',left:'50%',top:'200px',transform:'translateX(-50%)',width:'380px',background:'#FFFFFF',border:'2px dashed #E11D74',borderRadius:'14px',padding:'18px 22px',boxShadow:'0 8px 20px rgba(225,29,116,0.10)'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'14px'}},
              R('div',{style:{width:42,height:42,borderRadius:'10px',background:'linear-gradient(135deg,#E11D74,#B91C5C)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'20px',fontWeight:800}},'★'),
              R('div',{style:{fontSize:'22px',fontWeight:800,color:'#111928'}},'AI Agent')
            ),
            // Six Atlassian marks in a row at the bottom — fade in synced with tool rows
            R('div',{style:{marginTop:'18px',display:'flex',gap:'14px',justifyContent:'center'}},
              [t1,t2,t3,t4,t5,t6].map(function(p,i){
                return R('div',{key:i,style:{opacity:p,transform:'scale('+(0.6+0.4*p)+')'}}, atlassianMark(28));
              })
            )
          ),
          // Connector 2: dashed line + plus between AI Agent and Chat Output
          R('div',{style:{position:'absolute',left:'50%',top:'400px',width:'2px',height:'70px',transform:'translateX(-50%)',borderLeft:'2px dashed #9CA3AF'}}),
          R('div',{style:{position:'absolute',left:'50%',top:'428px',transform:'translate(-50%,-50%)',width:'26px',height:'26px',borderRadius:'50%',background:'#0084FF',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'18px',boxShadow:'0 4px 10px rgba(0,132,255,0.30)'}},'+'),

          // Node 3: Chat Output (bottom, y≈480-560)
          R('div',{style:{position:'absolute',left:'50%',top:'480px',transform:'translateX(-50%)',width:'320px',background:'#FFFFFF',border:'1.5px solid #E5E7EB',borderRadius:'12px',padding:'16px 20px',display:'flex',alignItems:'center',gap:'14px',boxShadow:'0 6px 14px rgba(17,25,40,0.06)'}},
            R('div',{style:{width:38,height:38,borderRadius:'9px',background:'linear-gradient(135deg,#EF4444,#DC2626)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'18px',fontWeight:800}},'➔'),
            R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'Chat Output')
          )
        ),

        // ─── Right config panel ───
        R('div',{style:{flex:1,background:'#FFFFFF',borderLeft:'1px solid #E5E7EB',display:'flex',flexDirection:'column',opacity:panelHeadP}},
          // Magenta header strip
          R('div',{style:{padding:'14px 20px',background:'linear-gradient(90deg,#B91C5C,#E11D74)',color:'#FFFFFF'}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{width:24,height:24,borderRadius:'6px',background:'rgba(255,255,255,0.22)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'13px'}},'★'),
              R('div',{style:{fontSize:'16px',fontWeight:800}},'AI Agent')
            ),
            R('div',{style:{marginTop:'4px',fontSize:'11px',color:'rgba(255,255,255,0.85)'}},'An AI agent that can call tools to accomplish tasks.')
          ),

          // Body
          R('div',{style:{flex:1,padding:'16px 18px',overflow:'hidden',display:'flex',flexDirection:'column',gap:'14px'}},

            // LLM
            R('div',null,
              R('div',{style:{fontSize:'10px',fontWeight:700,color:'#6B7280',letterSpacing:'0.08em'}},'LLM'),
              R('div',{style:{marginTop:'6px',padding:'10px 12px',border:'1px solid #E5E7EB',borderRadius:'8px',display:'flex',alignItems:'center',gap:'10px'}},
                R('div',{style:{width:24,height:24,borderRadius:'5px',background:'#F3F4F6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:800,color:'#6B7280'}},'A'),
                R('div',{style:{flex:1}},
                  R('div',{style:{fontSize:'12px',fontWeight:700,color:'#111928'}},'claude-4.5-haiku'),
                  R('div',{style:{fontSize:'10px',color:'#6B7280'}},'Anthropic')
                ),
                R('div',{style:{color:'#9CA3AF',fontSize:'12px'}},'▾')
              )
            ),

            // Input
            R('div',null,
              R('div',{style:{fontSize:'10px',fontWeight:700,color:'#6B7280',letterSpacing:'0.08em'}},'INPUT'),
              R('div',{style:{marginTop:'6px',padding:'10px 12px',border:'1px solid #E5E7EB',borderRadius:'8px',background:'#FAFAFB'}},
                R('span',{style:{padding:'2px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:700,borderRadius:'4px',fontFamily:'JetBrains Mono,monospace'}},'{input}')
              )
            ),

            // Tools
            R('div',{style:{flex:1,minHeight:0,display:'flex',flexDirection:'column'}},
              R('div',{style:{fontSize:'10px',fontWeight:700,color:'#6B7280',letterSpacing:'0.08em'}},'TOOLS'),
              R('div',{style:{marginTop:'6px',display:'flex',flexDirection:'column',gap:'5px'}},
                tools.map(function(tool,i){
                  return R('div',{key:i,style:{opacity:tool.p,transform:'translateX('+((1-tool.p)*-10)+'px)',padding:'7px 10px',border:'1px solid #E5E7EB',borderRadius:'7px',display:'flex',alignItems:'center',gap:'9px',background:'#FFFFFF'}},
                    R('div',{style:{width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center'}}, atlassianMark(16)),
                    R('div',{style:{flex:1,fontSize:'12px',fontWeight:600,color:'#111928'}}, tool.label),
                    R('div',{style:{padding:'2px 7px',background:'#EFF6FF',color:'#0052CC',fontSize:'9px',fontWeight:700,borderRadius:'4px'}},'atlassian')
                  );
                })
              )
            ),

            // System Message
            R('div',null,
              R('div',{style:{fontSize:'10px',fontWeight:700,color:'#6B7280',letterSpacing:'0.08em'}},'SYSTEM MESSAGE'),
              R('div',{style:{marginTop:'6px',padding:'10px 12px',border:'1px solid #E5E7EB',borderRadius:'8px',background:'#FAFAFB',fontSize:'12px',color:'#4B5563',lineHeight:1.4}},'You are a helpful assistant.')
            )
          )
        )
      )
    ):null
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
  var scrollY=lerp(0, -1180, scrollT);

  // Chat window geometry
  var winW=1500, winH=880;
  var winX=(1920-winW)/2;     // 210
  var winY=100;
  var headerH=46;
  var sidebarW=280;
  var inputBarH=72;
  var mainW=winW-sidebarW;    // 1220
  var mainH=winH-headerH;     // 834
  var viewportH=mainH-inputBarH; // 762

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
      'What can this FlowHunt agent do here, and with my Atlassian workspace?'
    )
  );

  // Assistant reply card - the long scrollable content.
  var assistantCard=R('div',{style:{background:'#F4F5F7',borderRadius:'14px',padding:'34px 38px',color:'#172B4D'}},
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

    // Soft eyebrow at the very top so the scene has a frame of reference
    R('div',{style:{position:'absolute',left:'50%',top:'40px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'FLOWHUNT'),

    // Chat window
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
    PivotScene:        { type: 'inline', code: PivotScene },
    DemoScene:         { type: 'inline', code: DemoScene },
    ArchScene:         { type: 'inline', code: ArchScene },
    InstallScene:      { type: 'inline', code: InstallScene },
    SnapshotScene:     { type: 'inline', code: SnapshotScene },
    FlowHuntSetupScene:{ type: 'inline', code: FlowHuntSetupScene },
    FlowHuntUsageScene:{ type: 'inline', code: FlowHuntUsageScene },
    CTAScene:          { type: 'inline', code: CTAScene },
    Watermark:         { type: 'inline', code: Watermark },
  },
  inputs: [],
  composition: {
    scenes: [
      scene('s1-pivot',     F.pivot,    'PivotScene'),
      scene('s2-explainer', F.snapshot, 'SnapshotScene'),       // Project-code primer
      scene('s3-demo',      F.demo,     'DemoScene'),           // Claude Code bug-triage
      scene('s4-arch',      F.arch,     'ArchScene'),
      scene('s5-install',   F.install,  'InstallScene'),        // Claude Code install + OAuth
      scene('s6-fh-setup',  F.fhSetup,  'FlowHuntSetupScene'),  // Same flow in FlowHunt
      scene('s7-fh-usage',  F.fhUsage,  'FlowHuntUsageScene'),  // FlowHunt agent answering
      scene('s8-cta',       F.cta,      'CTAScene', { type: 'fade', duration: 26 }),
    ],
  },
};

writeFileSync(join(__dirname, 'template.json'), JSON.stringify(template, null, 2));
console.log('template.json written (' + template.composition.scenes.length + ' scenes, ' + template.output.duration + 's, ' + TOTAL_FRAMES + ' frames)');
