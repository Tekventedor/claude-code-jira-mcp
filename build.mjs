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
  ccDirect:   { start: 730,  end: 1015,  dur: 285 },  // 9.5s — PATH 3: Claude Code direct to Atlassian
  fhOAuth:    { start: 1015, end: 1300,  dur: 285 },  // 9.5s — PATH 1+2 setup: FlowHunt Token-Auth
  fhMcp:      { start: 1300, end: 1585,  dur: 285 },  // 9.5s — PATH 2 setup: MCP Server + Connect JSON
  fhBridge:   { start: 1585, end: 1855,  dur: 270 },  // 9s   — PATH 2 wire-up: local + online
  fhUsage:    { start: 1855, end: 2125,  dur: 270 },  // 9s   — PATH 1 in action: FlowHunt agent scroll
  cta:        { start: 2125, end: 2365,  dur: 240 },  // 8s
};
const TOTAL_FRAMES = 2365;
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
  // Scroll the capability list so the "How to Use Me" example prompts +
  // closing line land inside the viewport by the bottom-hold phase.
  var scrollY=lerp(0, -1080, scrollT);

  // Browser window geometry — chrome stops above y≈970 so the FlowHunt
  // watermark (around y=994) sits CLEAN BELOW the box rather than over it.
  var browserW=1760, browserH=900;
  var browserX=(1920-browserW)/2;   // 80
  var browserY=50;
  var chromeChromeH=42;             // tabs row
  var urlBarH=44;                   // URL bar row
  var pageHdrH=52;                  // FlowHunt page-level header strip (Edit/Run/Batch)
  // Chat window sits *inside* the browser body, slightly inset.
  var winW=1500, winH=720;
  var winX=browserX+(browserW-winW)/2;   // centred inside browser
  var winY=browserY+chromeChromeH+urlBarH+pageHdrH+18;
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

  // FlowHunt mark on a blue-gradient tile — replaces the old "J"
  // letter icon. Uses the brand path FH_MARK_PATH already in scope.
  function fhSquare(size){
    var s=size||26;
    return R('div',{style:{width:s,height:s,borderRadius:'6px',background:grad,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 6px rgba(0,82,204,0.30)'}},
      R('svg',{width:Math.round(s*0.66),height:Math.round(s*0.53),viewBox:'0 0 275 223',fill:'none'},
        R('path',{d:'${FH_MARK_PATH}',fill:'#FFFFFF'})
      )
    );
  }

  // User bubble at top of conversation — short, natural question that a
  // user would actually type to a fresh agent. The agent's reply is the
  // standard "what I can do" intro it gives when prompted this way (and
  // is what FlowHunt actually returned for this agent in the user's demo).
  var userBubble=R('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:24}},
    R('div',{style:{maxWidth:'72%',background:grad,color:'#FFFFFF',padding:'14px 20px',borderRadius:'18px 18px 4px 18px',fontSize:'18px',fontWeight:500,lineHeight:1.5,boxShadow:'0 6px 18px rgba(0,82,204,0.18)'}},
      'What can you help me with?'
    )
  );

  // Assistant reply — sized and styled to match a real FlowHunt chat
  // response. No rounded card wrapper; content flows on the chat surface
  // like FlowHunt's actual output. Just the capability intro (no fake
  // ticket pull).
  var assistantCard=R('div',{style:{padding:'10px 4px',color:'#172B4D'}},

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
          R('div',{style:{display:'inline-flex',alignItems:'center'}},
            R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
            R('span',{style:{color:'#6B7280'}},'/agents/jira/chat')
          )
        )
      ),
      // FlowHunt page-level header inside the browser — matches the
      // real agent-run page: breadcrumb on the left, Edit / Run / Batch
      // pill toggle centred with Run active, History + Publish on right.
      R('div',{style:{height:pageHdrH+'px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 24px',gap:'14px',position:'relative'}},
        // Left: Agents > Jira breadcrumb with caret
        R('div',{style:{fontSize:'13px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},
          R('span',null,'‹'),
          R('span',null,'Agents')
        ),
        R('div',{style:{display:'flex',alignItems:'center',gap:'4px',fontSize:'13px',color:'#111928',fontWeight:700}},
          R('span',null,'Atlassian Agent'),
          R('span',{style:{color:'#9CA3AF',fontWeight:500}},'▾')
        ),
        // Centre: Edit | Run | Batch pill toggle (Run active = dark pill)
        R('div',{style:{position:'absolute',left:'50%',transform:'translateX(-50%)',display:'flex',alignItems:'center',padding:'3px',background:'#F4F5F7',border:'1px solid #E5E7EB',borderRadius:'999px',gap:'2px',fontSize:'13px',fontWeight:600}},
          R('div',{style:{padding:'4px 16px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},
            R('span',{style:{fontSize:'12px'}},'✎'),
            R('span',null,'Edit')
          ),
          R('div',{style:{padding:'4px 16px',background:'#111928',color:'#FFFFFF',borderRadius:'999px',display:'flex',alignItems:'center',gap:'6px',boxShadow:'0 1px 3px rgba(17,25,40,0.20)'}},
            R('span',{style:{fontSize:'11px'}},'▶'),
            R('span',null,'Run')
          ),
          R('div',{style:{padding:'4px 16px',color:'#6B7280',display:'flex',alignItems:'center',gap:'6px'}},
            R('span',{style:{fontSize:'12px'}},'☰'),
            R('span',null,'Batch')
          )
        ),
        // Right: History / Version: 3 / Publish Agent
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'14px',fontSize:'12px',color:'#6B7280'}},
          R('div',{style:{display:'flex',alignItems:'center',gap:'6px',padding:'5px 11px',background:'#F4F5F7',borderRadius:'14px',fontWeight:600}},
            R('span',{style:{fontSize:'11px'}},'⏱'),
            R('span',null,'History'),
            R('span',{style:{color:'#9CA3AF',marginLeft:'4px'}},'Version: 3')
          ),
          R('div',{style:{padding:'7px 16px',background:grad,color:'#FFFFFF',borderRadius:'8px',fontSize:'13px',fontWeight:700,boxShadow:'0 4px 10px rgba(0,82,204,0.25)'}},'Publish Agent')
        )
      )
    ),

    // ─── Chat window — sits inside the browser body ─────────────────
    R('div',{style:{position:'absolute',left:winX+'px',top:(winY+rise)+'px',width:winW+'px',height:winH+'px',background:'#FFFFFF',borderRadius:'14px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.18)',border:'1px solid #DFE1E6',opacity:inP}},

      // ── Top header bar ──
      R('div',{style:{height:headerH+'px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'12px'}},
        fhSquare(26),
        R('div',{style:{fontSize:'16px',fontWeight:700,color:'#172B4D'}},'Atlassian Agent'),
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

// fh-oauth-scene-v2.snippet.mjs
// Replacement template-literal const for FlowHuntOAuthScene (Scene 5, 285f / 9.5s).
//
// Restructured to show the *actual* temporal order of the Token-based Auth flow:
//   Phase A (0–70):   FlowHunt Integrations page renders inside the Chrome browser
//                     window. URL app.flowhunt.io/integrations. Two Atlassian
//                     cards side-by-side (OAuth left, Token-based Auth right).
//                     Token-based Auth card shows BETA tag + an "Integrate"
//                     button. Search bar typewriters "atlas" in first ~40f.
//   Phase B (70–110): Click flash on the Token-based Auth card's Integrate
//                     button. The page dims (rgba(0,0,0,0.30) overlay) and the
//                     Token-based Auth modal slides/fades in over the page.
//   Phase C (110–180):Modal fully visible. Left column: Atlassian logo,
//                     heading, blurb, Key Features bullets. Right column: tabs
//                     (Configuration active), header row, blue API-tokens
//                     instructions callout, three pre-filled form fields
//                     (Atlassian Domain / Email / API Token — dots typewriter
//                     ~f=130→170), Close + Integrate Atlassian buttons. Click
//                     flash on Integrate Atlassian around f=200.
//   Phase D (180–250):Modal scales down + fades out. Behind it the Integrations
//                     page transitions to its INTEGRATED state: Token-based
//                     Auth card now shows "Manage Integration" + green
//                     "Integrated" tag (with check icon). A green success
//                     toast slides in from the top-right of the page.
//   Phase E (250–285):Hold. Manage Integration button gets a phase-integrated
//                     fast→slow breathing pulse (fast 0.22 until f=250, slow
//                     0.085 after). Standard op formula handles scene-out
//                     fade in the last 20 frames.
//
// Uses ${HELPERS}, ${ATLASSIAN_MARK} and ${FH_MARK_PATH} placeholders so
// build.mjs interpolates them at compose time. No other files modified.

// ClaudeCodeDirectScene — the "third path" scene for the rendervid promo.
//
// The video has spent its time so far establishing FlowHunt as the bridge
// between Claude Code and Atlassian. This scene flips that framing: Claude
// Code can ALSO speak directly to Atlassian's hosted MCP server with a
// single `claude mcp add` command and a standard OAuth click — no FlowHunt
// in the middle. The eyebrow reads "OR · STEP 1 ALTERNATIVE" so the
// viewer parses this as a sibling to the FlowHunt path, not a replacement.
//
// Choreography (mirrors InstallScene exactly so it visually rhymes with
// the rest of the deck):
//   Phase A (0–130):   tall terminal renders; `claude mcp add ...` types
//                      in; result line + "opening browser..." reveal.
//   Phase B (130–170): terminal scales/fades out; Chrome window rises
//                      from below (1500×780, same chrome bar pattern).
//   Phase C (170–216): Atlassian OAuth consent body — Atlassian wordmark,
//                      header naming Claude Code as the requester, and
//                      three staggered permission rows.
//   Phase D (216–265): Accept button reveals with the same phase-integrated
//                      fast→slow breathing pulse used in InstallScene.
//   Phase E (265–285): scene-out fade via the standard `op` formula.
//
// Output: a single template-literal const. Build-time interpolations
// (${HELPERS}, ${ATLASSIAN_MARK}, ${CLAUDE_ICON}) are written with a
// literal '$' so build.mjs's outer template literal expands them at
// compose time. No other files are touched.

const ClaudeCodeDirectScene = `function ClaudeCodeDirectScene(props){${HELPERS}
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

  // ─── Phase D: Accept ring pulse — fast/snappy when it first appears
  // so the viewer notices, then slows into a calmer breathe. Phase is
  // integrated across the rate change so there's no jump.
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

  // The Claude Code mark (used as a small badge in the consent header
  // strip so the requesting app reads visually as well as in copy).
  function claudeMark(size){
    var s=size||40;
    return R('img',{src:'${CLAUDE_ICON}',width:s,height:s,style:{display:'block',borderRadius:'9px',boxShadow:'0 2px 6px rgba(217,119,87,0.35)'}});
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Header ─────────────────────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'60px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'OR · STEP 1 ALTERNATIVE'),
    R('div',{style:{position:'absolute',left:'50%',top:'96px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928',letterSpacing:'-0.4px'}},'Claude Code direct to Atlassian.'),
    R('div',{style:{position:'absolute',left:'50%',top:'150px',transform:'translateX(-50%)',fontSize:'18px',fontWeight:500,color:'#6B7280'}},'One terminal command. No FlowHunt needed.'),

    // ─── Tall terminal (Phase A → fades during Phase B) ─────────────
    termOpacity>0.005?R('div',{style:{position:'absolute',left:'50%',top:'210px',width:'1600px',transform:'translateX(-50%) translateY('+termShift+'px) scale('+termScale+')',transformOrigin:'top center',background:'#0F172A',borderRadius:'14px',overflow:'hidden',boxShadow:'0 28px 60px rgba(17,25,40,0.25)',opacity:termOpacity}},
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

    // ─── Chrome browser window — Atlassian OAuth consent (Phase B/C) ─
    chromeP>0.005?R('div',{style:{position:'absolute',left:'50%',top:(210+chromeRise)+'px',width:'1500px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:chromeP,border:'1px solid #D1D5DB'}},

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
      R('div',{style:{padding:'54px 80px 60px',display:'flex',flexDirection:'column',alignItems:'center'}},

        // Atlassian wordmark + logo + small Claude Code badge on the right
        R('div',{style:{display:'flex',alignItems:'center',gap:'18px',marginBottom:'34px',opacity:chromeP}},
          atlassianMark(56),
          R('div',{style:{fontSize:'32px',fontWeight:700,color:'#172B4D',letterSpacing:'-0.5px'}},'Atlassian'),
          R('div',{style:{width:'1px',height:'30px',background:'#DFE1E6',margin:'0 6px'}}),
          claudeMark(34),
          R('div',{style:{fontSize:'15px',fontWeight:700,color:'#42526E'}},'Claude Code')
        ),

        // Big header
        R('div',{style:{textAlign:'center',opacity:headerP,transform:'translateY('+(10*(1-headerP))+'px)'}},
          R('div',{style:{fontSize:'34px',fontWeight:800,color:'#172B4D',letterSpacing:'-0.4px',maxWidth:'860px',lineHeight:1.2}},'Claude Code is requesting access to your Atlassian account.'),
          R('div',{style:{marginTop:'10px',fontSize:'18px',color:'#6B7280'}},'Review what Claude Code will be able to do, then choose Accept.')
        ),

        // Permission rows — bigger, with descriptions
        R('div',{style:{marginTop:'36px',width:'780px',display:'flex',flexDirection:'column',gap:'12px'}},
          R('div',{style:{opacity:r1,transform:'translateX('+((1-r1)*-14)+'px)',padding:'18px 22px',background:'#F4F5F7',border:'1px solid #DFE1E6',borderRadius:'10px',display:'flex',alignItems:'center',gap:'18px'}},
            R('div',{style:{width:32,height:32,borderRadius:'50%',background:'#0052CC',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'18px'}},'✓'),
            R('div',{style:{flex:1}},
              R('div',{style:{fontSize:'18px',fontWeight:700,color:'#172B4D'}},'Read your Jira and Confluence content'),
              R('div',{style:{marginTop:'2px',fontSize:'14px',color:'#6B7280'}},'View projects, issues, and pages just like you would in the web app.')
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
              R('div',{style:{marginTop:'2px',fontSize:'14px',color:'#6B7280'}},'File new Jira issues, leave comments, and change ticket status.')
            )
          )
        ),

        // Buttons row
        R('div',{style:{marginTop:'36px',width:'780px',display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'18px',opacity:btnP,transform:'translateY('+(8*(1-btnP))+'px)'}},
          R('div',{style:{padding:'14px 26px',fontSize:'16px',fontWeight:700,color:'#42526E',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'8px'}},'Cancel'),
          R('div',{style:{padding:'14px 36px',fontSize:'17px',fontWeight:700,color:'#FFFFFF',background:'#0052CC',borderRadius:'8px',boxShadow:'0 0 0 '+(4+10*acceptPulse)+'px rgba(0,82,204,0.18)'}},'Accept')
        )
      )
    ):null
  );
}`;

const FlowHuntOAuthScene = `function FlowHuntOAuthScene(props){${HELPERS}
  var f=props.frame||0;
  var END=285;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Phase A: Integrations page reveal + search typewriter ─────────
  var pageIn=ease(cl(f/18));
  // Typewriter "atlassian" across the first ~70 frames
  var searchText='atlassian';
  var searchChars=Math.max(0,Math.min(searchText.length, Math.floor((f-6)/7)));
  var searchTyped=searchText.slice(0, searchChars);
  // Caret blink while typing, hidden once full text is in
  var searchCaret=(searchChars<searchText.length && Math.floor(f/6)%2===0)?'|':'';

  // ─── Phase B: Integrate button click flash + modal entrance ────────
  // Click happens at f=80; flash narrow around it.
  var integrateClick=cl(1-Math.abs(f-80)/6);
  // Page-behind dim ramps in 70→105
  var pageDim=ease(cl((f-70)/35));
  // Modal slide-in begins ~f=82, settles by ~f=115
  var modalIn=ease(cl((f-82)/30));
  // Modal exit begins f=180, completes by f=215
  var modalOut=easeIn(cl((f-180)/35));
  var modalOpacity=cl(modalIn-modalOut);
  var modalScale=(0.94 + 0.06*modalIn) * (1 - 0.05*modalOut);
  var modalShift=(1-modalIn)*18 - 14*modalOut;

  // Staggered reveal of right-column form blocks once the modal is open.
  function formIn(d){return ease(cl((f-(112+d))/16));}
  var fi1=formIn(0), fi2=formIn(8), fi3=formIn(16), fi4=formIn(24), fi5=formIn(32);

  // API Token dots typewriter — start ~f=130, finish ~f=170. ~28 dots.
  var tokenDots=28;
  var tokenCount=Math.max(0,Math.min(tokenDots, Math.floor((f-130)/1.45)));
  var tokenStr='';
  for(var ti=0;ti<tokenCount;ti++){ tokenStr+='•'; }
  var tokenCaret=(tokenCount<tokenDots && Math.floor(f/6)%2===0)?'|':'';

  // Integrate Atlassian button click flash — around f=200
  var submitClick=cl(1-Math.abs(f-200)/6);

  // ─── Phase D: Integrated-state crossfade behind modal ──────────────
  // Card swaps from un-integrated → integrated state starting f=190
  var integratedP=ease(cl((f-190)/30));
  // Success toast slides in from top-right shortly after card swaps
  var toastP=ease(cl((f-210)/16));
  // Toast can hold then gently fade near the end
  var toastFade=easeIn(cl((f-275)/10));
  var toastOpacity=cl(toastP-toastFade);

  // ─── Phase E: Manage Integration pulse — phase-integrated fast→slow ──
  // Pulse exists only once the integrated state is visible.
  var pulseStart=210;
  var fastEnd=250;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-pulseStart)*fastFreq
    : (fastEnd-pulseStart)*fastFreq + (f-fastEnd)*slowFreq;
  var managePulse=Math.max(0,0.5+0.5*Math.sin(pulsePhase));
  // Only show pulse after integrated state is in
  var manageGlow=managePulse*cl((f-pulseStart)/14);

  // Atlassian mark (PNG inlined via assets.mjs)
  function atlassianMark(size){
    var s=size||40;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block'}});
  }

  // FlowHunt mark — brand path + blue gradient
  function fhMark(size){
    var s=size||22;
    var uid=('fhoa'+Math.floor(s*1000));
    return R('svg',{width:s,height:s*(223/275),viewBox:'0 0 275 223',style:{display:'block'}},
      R('defs',null,
        R('linearGradient',{id:uid,x1:0,y1:0,x2:275,y2:223,gradientUnits:'userSpaceOnUse'},
          R('stop',{stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))
      ),
      R('path',{d:'${FH_MARK_PATH}',fill:'url(#'+uid+')'})
    );
  }

  // Reusable key-feature bullet (bold-then-colon style)
  function bullet(opa, label, body){
    return R('div',{style:{opacity:opa,transform:'translateX('+((1-opa)*-8)+'px)',display:'flex',gap:'10px',alignItems:'flex-start'}},
      R('span',{style:{color:'#0084FF',marginTop:'5px',fontSize:'10px',lineHeight:1}},'●'),
      R('div',null, R('span',{style:{fontWeight:700,color:'#172B4D'}}, label),' ', body)
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Header (above Chrome) ──────────────────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'70px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'STEP 1 · TOKEN-BASED AUTH'),
    R('div',{style:{position:'absolute',left:'50%',top:'108px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928'}},'Connect Atlassian to FlowHunt with an API token.'),

    // ─── Chrome browser window with the FlowHunt Integrations page ──
    R('div',{style:{position:'absolute',left:'50%',top:'200px',width:'1500px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:pageIn,border:'1px solid #D1D5DB'}},

      // Chrome chrome bar — tabs row (matches InstallScene markup)
      R('div',{style:{height:'44px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'34px',padding:'0 18px',background:'#F4F5F7',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#172B4D',fontWeight:600}},
          R('div',{style:{width:14,height:14,borderRadius:'3px',background:'linear-gradient(135deg,#0084FF,#1A56DB)'}}),
          R('span',null,'Integrations · FlowHunt')
        )
      ),

      // URL bar — green dot + host
      R('div',{style:{height:'48px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'14px'}},
        R('div',{style:{display:'flex',gap:'14px',color:'#9AA0A6',fontSize:'18px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'8px 16px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'20px',fontSize:'14px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E'}}),
          R('div',{style:{display:'inline-flex',alignItems:'center'}},
            R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
            R('span',{style:{color:'#6B7280'}},'/integrations')
          )
        )
      ),

      // FlowHunt page-level header inside the browser
      R('div',{style:{height:'48px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 28px',gap:'14px'}},
        R('div',{style:{display:'flex',alignItems:'center',fontSize:'18px',fontWeight:800,letterSpacing:'-0.3px'}},
          R('span',{style:{color:'#111928'}},'Flow'),
          R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
        ),
        R('div',{style:{marginLeft:'14px',fontSize:'13px',color:'#111928',fontWeight:700}},'Integrations'),
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'12px',fontSize:'12px',color:'#6B7280'}},
          R('div',{style:{padding:'5px 11px',background:'#F4F5F7',borderRadius:'14px',fontWeight:600}},'Example Workspace')
        )
      ),

      // ─── Body: Integrations page ────────────────────────────────
      R('div',{style:{position:'relative',padding:'28px 48px',height:'640px',background:'#F9FAFB',overflow:'hidden'}},

        // Page title
        R('div',{style:{fontSize:'28px',fontWeight:800,color:'#111928',letterSpacing:'-0.4px'}},'Integrations'),

        // Search bar (typewriter) + Category dropdown + Clear filters
        R('div',{style:{marginTop:'18px',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{flex:'0 0 320px',padding:'9px 14px',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'8px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px'}},
            R('span',{style:{color:'#9CA3AF',fontWeight:700}},'⌕'),
            R('div',{style:{display:'inline-flex',alignItems:'center',color:'#111928'}},
              R('span',null, searchTyped),
              R('span',{style:{color:'#0084FF',marginLeft:'1px'}}, searchCaret)
            ),
            R('span',{style:{marginLeft:'auto',color:'#9CA3AF',fontSize:'14px'}}, searchChars>0 ? '×' : '')
          ),
          R('div',{style:{padding:'9px 14px',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'14px',color:'#42526E',fontWeight:600,display:'flex',alignItems:'center',gap:'6px'}},
            R('span',null,'Category'),
            R('span',{style:{color:'#9CA3AF'}},'▾')
          ),
          R('div',{style:{padding:'9px 14px',fontSize:'14px',color:'#6B7280',fontWeight:600,display:'flex',alignItems:'center',gap:'6px'}},
            R('span',null,'×'),
            R('span',null,'Clear filters')
          )
        ),

        // Two Atlassian cards side by side
        R('div',{style:{marginTop:'24px',display:'flex',gap:'18px',position:'relative'}},

          // LEFT: Atlassian (OAuth) — alternative, not selected
          R('div',{style:{flex:1,padding:'22px 24px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'14px',position:'relative'}},
            atlassianMark(38),
            R('div',{style:{marginTop:'14px',fontSize:'18px',fontWeight:800,color:'#111928'}},'Atlassian (OAuth)'),
            R('div',{style:{marginTop:'8px',fontSize:'13px',color:'#6B7280',lineHeight:1.5}},'Integrate Atlassian to automate your Jira and Confluence processes.'),
            R('div',{style:{marginTop:'18px',padding:'8px 16px',background:'#FFFFFF',border:'1px solid #D1D5DB',color:'#172B4D',fontSize:'13px',fontWeight:700,borderRadius:'6px',display:'inline-block'}},'Integrate')
          ),

          // RIGHT: Atlassian (Token-based Auth) — the selected path.
          // Crossfade between un-integrated state and integrated state.
          R('div',{style:{flex:1,position:'relative'}},

            // UN-INTEGRATED state (visible before integratedP fades in)
            R('div',{style:{position:'relative',padding:'22px 24px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'14px',opacity:1-integratedP}},
              R('div',{style:{position:'absolute',top:'14px',right:'14px',padding:'2px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.04em'}},'BETA'),
              atlassianMark(38),
              R('div',{style:{marginTop:'14px',fontSize:'18px',fontWeight:800,color:'#111928'}},'Atlassian (Token-based Auth)'),
              R('div',{style:{marginTop:'8px',fontSize:'13px',color:'#6B7280',lineHeight:1.5}},'Integrate Atlassian to automate your Jira and Confluence processes.'),
              R('div',{style:{marginTop:'18px',padding:'8px 16px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',fontWeight:700,borderRadius:'6px',display:'inline-block',boxShadow:'0 0 0 '+(8*integrateClick)+'px rgba(0,132,255,0.28)'}},'Integrate')
            ),

            // INTEGRATED state — overlaid, fades in once form is submitted
            integratedP>0.005?R('div',{style:{position:'absolute',inset:0,padding:'22px 24px',background:'#EFF6FF',border:'1.5px solid #0084FF',borderRadius:'14px',opacity:integratedP,boxShadow:'0 8px 22px rgba(0,132,255,0.10)'}},
              R('div',{style:{position:'absolute',top:'14px',right:'14px',display:'flex',gap:'6px'}},
                R('div',{style:{padding:'2px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.04em'}},'BETA')
              ),
              atlassianMark(38),
              R('div',{style:{marginTop:'14px',fontSize:'18px',fontWeight:800,color:'#111928'}},'Atlassian (Token-based Auth)'),
              R('div',{style:{marginTop:'8px',fontSize:'13px',color:'#6B7280',lineHeight:1.5}},'Integrate Atlassian to automate your Jira and Confluence processes.'),
              R('div',{style:{marginTop:'18px',display:'flex',alignItems:'center',gap:'10px'}},
                R('div',{style:{padding:'8px 16px',background:'#0084FF',color:'#FFFFFF',fontSize:'13px',fontWeight:700,borderRadius:'6px',boxShadow:'0 0 0 '+(2+8*manageGlow)+'px rgba(0,132,255,0.20)'}},'Manage Integration'),
                R('div',{style:{display:'flex',alignItems:'center',gap:'6px',color:'#047857',fontSize:'13px',fontWeight:700}},
                  R('div',{style:{width:18,height:18,borderRadius:'50%',background:'#10B981',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'11px'}},'✓'),
                  R('span',null,'Integrated')
                )
              )
            ):null
          )
        ),

        // ─── Success toast (top-right of page body) ──────────────
        toastOpacity>0.005?R('div',{style:{position:'absolute',right:'48px',top:'24px',opacity:toastOpacity,transform:'translateX('+((1-toastP)*40)+'px)',padding:'14px 18px',background:'#ECFDF5',border:'1px solid #10B981',borderRadius:'12px',display:'flex',alignItems:'flex-start',gap:'14px',boxShadow:'0 12px 28px rgba(16,185,129,0.22)',maxWidth:'460px',zIndex:5}},
          R('div',{style:{width:'30px',height:'30px',borderRadius:'50%',background:'#10B981',color:'#FFFFFF',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'16px',flex:'0 0 30px'}},'✓'),
          R('div',{style:{flex:1}},
            R('div',{style:{fontSize:'14px',color:'#065F46',fontWeight:700,lineHeight:1.35}},'Atlassian (Token-based Auth) was successfully integrated.'),
            R('div',{style:{marginTop:'4px',fontSize:'12px',color:'#047857',lineHeight:1.45}},'Your API token is stored. FlowHunt agents can now use Atlassian tools.')
          )
        ):null,

        // ─── Page dim overlay while modal is open ─────────────────
        pageDim>0.005 && modalOpacity>0.005 ? R('div',{style:{position:'absolute',inset:0,background:'rgba(0,0,0,0.30)',opacity:pageDim*(1-easeIn(cl((f-180)/30)))}}) : null,

        // ─── The Token-based Auth modal (over the dimmed page) ────
        modalOpacity>0.005 ? R('div',{style:{position:'absolute',left:'50%',top:'40px',transform:'translateX(-50%) translateY('+modalShift+'px) scale('+modalScale+')',transformOrigin:'top center',width:'1100px',height:'540px',background:'#FFFFFF',borderRadius:'14px',boxShadow:'0 30px 70px rgba(17,25,40,0.32)',overflow:'hidden',border:'1px solid #E5E7EB',opacity:modalOpacity,display:'flex'}},

          // Left column (~38%) — instructions
          R('div',{style:{width:'420px',padding:'28px 28px',borderRight:'1px solid #E5E7EB',background:'#FFFFFF',display:'flex',flexDirection:'column',gap:'12px'}},
            R('div',{style:{display:'flex',alignItems:'flex-start',gap:'14px'}},
              atlassianMark(44),
              R('div',{style:{fontSize:'20px',fontWeight:800,color:'#111928',lineHeight:1.2,letterSpacing:'-0.3px'}},'Atlassian (Token-based Auth)')
            ),
            R('div',{style:{fontSize:'12.5px',color:'#4B5563',lineHeight:1.55}},'Atlassian integration allows you to integrate Atlassian Jira and Confluence to your workspace.'),
            R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928',marginTop:'4px'}},'Key Features:'),
            R('div',{style:{display:'flex',flexDirection:'column',gap:'8px',fontSize:'12.5px',color:'#4B5563',lineHeight:1.5}},
              bullet(fi1,'Manage Jira Issues:','Create, update, and manage Jira issues directly from FlowHunt.'),
              bullet(fi2,'Manage Confluence Pages:','Create, update, and manage Confluence pages directly from FlowHunt.'),
              bullet(fi3,'Manage Jira Projects:','Create, update, and manage Jira projects directly from FlowHunt.'),
              bullet(fi4,'Manage Jira Boards:','Create, update, and manage Jira boards directly from FlowHunt.')
            )
          ),

          // Right column (~62%) — form
          R('div',{style:{flex:1,padding:'22px 28px 24px 28px',background:'#FFFFFF',display:'flex',flexDirection:'column',gap:'12px'}},

            // Tabs row: Configuration | Available Agents
            R('div',{style:{display:'flex',gap:'24px',borderBottom:'1px solid #E5E7EB',paddingBottom:'8px'}},
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',fontWeight:700,color:'#0084FF',borderBottom:'2px solid #0084FF',paddingBottom:'6px',marginBottom:'-9px'}},
                R('span',{style:{fontSize:'12px'}},'⚙'), R('span',null,'Configuration')
              ),
              R('div',{style:{display:'flex',alignItems:'center',gap:'6px',fontSize:'13px',fontWeight:600,color:'#6B7280',paddingBottom:'6px'}},
                R('span',{style:{fontSize:'12px'}},'☆'), R('span',null,'Available Agents')
              )
            ),

            // Header row: small Atlassian mark + name + Not Connected dot + Self Hosted pill
            R('div',{style:{display:'flex',alignItems:'center',gap:'14px'}},
              atlassianMark(34),
              R('div',{style:{flex:1}},
                R('div',{style:{fontSize:'15px',fontWeight:800,color:'#111928'}},'Atlassian (Token-based Auth)'),
                R('div',{style:{display:'flex',alignItems:'center',gap:'6px',marginTop:'3px',fontSize:'11.5px',color:'#6B7280'}},
                  R('span',{style:{width:'8px',height:'8px',borderRadius:'50%',background:'#9CA3AF'}}), R('span',null,'Not Connected')
                )
              ),
              R('div',{style:{padding:'5px 11px',background:'#F3F4F6',border:'1px solid #D1D5DB',borderRadius:'6px',fontSize:'11.5px',fontWeight:600,color:'#4B5563'}},'Self Hosted')
            ),

            // API token instructions callout
            R('div',{style:{opacity:fi1,padding:'11px 14px',background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'10px',fontSize:'11.5px',color:'#1E3A8A',lineHeight:1.55}},
              R('div',{style:{fontWeight:700,color:'#0052CC',marginBottom:'2px'}},'For Atlassian Cloud:'),
              R('div',null,'1. Visit ',R('span',{style:{fontFamily:'JetBrains Mono,monospace',color:'#0052CC'}},'id.atlassian.com/manage-profile/security/api-tokens')),
              R('div',null,'2. Click ',R('span',{style:{fontFamily:'JetBrains Mono,monospace',color:'#172B4D',fontWeight:700}},'"Create API token"')),
              R('div',null,'3. Give it a label e.g. ',R('span',{style:{fontFamily:'JetBrains Mono,monospace',color:'#172B4D',fontWeight:700}},'"FlowHunt Integration"')),
              R('div',null,'4. Copy the generated token and paste it below.')
            ),

            // Atlassian Domain
            R('div',{style:{opacity:fi2}},
              R('div',{style:{fontSize:'11.5px',fontWeight:700,color:'#172B4D',marginBottom:'4px'}},'Atlassian Domain'),
              R('div',{style:{padding:'8px 12px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'12.5px',color:'#172B4D',fontFamily:'JetBrains Mono,monospace'}},'flowhunt.atlassian.net')
            ),

            // Email
            R('div',{style:{opacity:fi3}},
              R('div',{style:{fontSize:'11.5px',fontWeight:700,color:'#172B4D',marginBottom:'4px'}},'Email'),
              R('div',{style:{padding:'8px 12px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'12.5px',color:'#172B4D',fontFamily:'JetBrains Mono,monospace'}},'you@example.com')
            ),

            // API Token (dots typewriter)
            R('div',{style:{opacity:fi4}},
              R('div',{style:{fontSize:'11.5px',fontWeight:700,color:'#172B4D',marginBottom:'4px'}},'API Token'),
              R('div',{style:{padding:'8px 12px',background:'#FFFFFF',border:'1.5px solid #D1D5DB',borderRadius:'8px',fontSize:'16px',color:'#172B4D',letterSpacing:'2px',minHeight:'18px'}},
                R('span',null, tokenStr),
                R('span',{style:{color:'#0084FF',marginLeft:'2px',fontSize:'13px'}}, tokenCaret)
              )
            ),

            // Buttons row
            R('div',{style:{marginTop:'auto',display:'flex',justifyContent:'flex-end',gap:'12px',opacity:fi5}},
              R('div',{style:{padding:'9px 20px',background:'#FFFFFF',color:'#42526E',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'12.5px',fontWeight:700}},'Close'),
              R('div',{style:{padding:'9px 20px',background:'#0052CC',color:'#FFFFFF',borderRadius:'8px',fontSize:'12.5px',fontWeight:700,boxShadow:'0 0 0 '+(8*submitClick)+'px rgba(0,82,204,0.28)'}},'Integrate Atlassian')
            )
          )
        ) : null
      )
    )
  );
}`;

// Summary:
// 1. Restructures Scene 5 into proper temporal order: Integrations page first (with
//    typewriter search), modal opens on Integrate-button click, form fills, submits,
//    modal exits, then integrated state appears with success toast.
// 2. Preserves visual identity, op formula, Chrome window dims/markup, header,
//    Atlassian card style, bullet style, and the InstallScene-style phase-integrated
//    fast→slow pulse formula (now applied to Manage Integration).
// 3. Uses ${HELPERS} / ${ATLASSIAN_MARK} / ${FH_MARK_PATH} placeholders so build.mjs interpolates them at compose time; no other files modified.

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

// FlowHuntMcpServerScene v2 — SCENE 6 replacement (285f, 9.5s).
//
// Everything lives inside ONE Chrome browser window (1700x860 centred).
// The FlowHunt app sidebar is visible throughout. The main pane swaps
// between the Configure tab (Phase A — capabilities list as cards
// scrolling through ~12 Jira tools) and the Connect tab (Phase C —
// Client dropdown, blurb, dark JSON config card with Copy click + Copied
// tooltip, yellow Caution callout, Create preconfigured agent card with
// pulsing + Create AI Agent button).
//
// Phase plan (frame-local):
//   0–155   A: Configure tab active, capability cards scroll
//   155–175 B: tab transition (Configure underline → Connect underline)
//   175–260 C: Connect tab active, JSON copy + caution + agent card
//   260–285 D: scene-out fade
//
// HELPERS / ATLASSIAN_MARK / FH_MARK_PATH are interpolated at compose time
// by build.mjs. No other files modified.

const FlowHuntMcpServerScene = `function FlowHuntMcpServerScene(props){${HELPERS}
  var f=props.frame||0;
  var END=285;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Browser shell entrance ────────────────────────────────────────
  var chromeP=ease(cl(f/22));

  // ─── Phase A: Configure tab — capabilities cards ───────────────────
  var configHeadP=ease(cl((f-12)/18));
  var configListP=ease(cl((f-22)/22));

  // Tab transition (Phase B): the Connect tab becomes active at ~f=160.
  // 0..1 ramp 155→175.
  var tabSwap=ease(cl((f-155)/20));
  // While the Configure pane fades out, the Connect pane fades in.
  var configPaneOpacity=cl(1-tabSwap);
  var connectPaneOpacity=ease(cl((f-170)/18));

  // The underline lerps from over-Configure to over-Connect during swap.
  // (Tab widths: Configure ~88px, Connect ~74px; we just animate the
  //  underline's left offset + width across the strip.)
  var underlineLeft=lerp(0, 110, tabSwap);
  var underlineWidth=lerp(78, 70, tabSwap);

  // ─── Phase C: Connect tab content reveals ──────────────────────────
  var clientP=ease(cl((f-178)/18));
  var blurbP=ease(cl((f-186)/20));
  var codeCardP=ease(cl((f-194)/22));
  var cautionP=ease(cl((f-208)/22));
  var agentCardP=ease(cl((f-216)/22));

  // Copy click flash + "Copied" tooltip around f=220
  var copyClickFlash=Math.max(0, 1-Math.abs(f-220)/8);
  var copiedTipP=ease(cl((f-220)/10))*(1-easeIn(cl((f-250)/22)));

  // ─── + Create AI Agent pulse — phase-integrated fast→slow ──────────
  var pulseStart=215;
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-pulseStart)*fastFreq
    : (fastEnd-pulseStart)*fastFreq + (f-fastEnd)*slowFreq;
  var agentPulse=0.5+0.5*Math.sin(pulsePhase);
  var agentGlow=agentPulse*cl((f-pulseStart)/14);

  // ─── Capability list scroll — translateY inside overflow:hidden ────
  // Runs across most of Phase A, scrolling ~360px so several rows pass.
  var scrollT=easeInOut(cl((f-20)/120));
  var scrollY=lerp(0, -360, scrollT);

  // Atlassian mark helper
  function atlassianMark(size){
    var s=size||24;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block'}});
  }

  // FlowHunt mark — brand path + blue gradient
  function fhMark(size){
    var s=size||22;
    var uid=('fhmcp'+Math.floor(s*1000));
    return R('svg',{width:s,height:s*(223/275),viewBox:'0 0 275 223',style:{display:'block'}},
      R('defs',null,
        R('linearGradient',{id:uid,x1:0,y1:0,x2:275,y2:223,gradientUnits:'userSpaceOnUse'},
          R('stop',{stopColor:'#0084FF'}),R('stop',{offset:1,stopColor:'#1A56DB'}))
      ),
      R('path',{d:'${FH_MARK_PATH}',fill:'url(#'+uid+')'})
    );
  }

  // ── Capabilities (cards in the Configure tab) — 12 Jira tools ──
  var capabilities=[
    {name:'get_user_profile',     desc:'Retrieve profile information for a specific Jira user by email, username, or account ID. Returns...'},
    {name:'get_issue',            desc:'Get comprehensive details of a specific Jira issue including fields, comments, attachments...'},
    {name:'search_issues',        desc:'Search for Jira issues using JQL (Jira Query Language). Returns paginated results with c...'},
    {name:'search_fields',        desc:'Search and discover Jira field definitions using fuzzy matching. Essential for finding cust...'},
    {name:'create_issue',         desc:'Create a new Jira issue with standard and custom fields. Returns the created issue with i...'},
    {name:'batch_create_issues',  desc:'Create multiple Jira issues in a single API call for improved efficiency. Useful for bulk ope...'},
    {name:'batch_update_issues',  desc:'Update multiple Jira issues in a single API call for improved efficiency. Useful for bulk fiel...'},
    {name:'update_issue',         desc:'Update fields of an existing Jira issue. Only provided fields will be updated. Examples: - U...'},
    {name:'delete_issue',         desc:'Delete a Jira issue.'},
    {name:'get_issue_comments',   desc:'Get comments for a specific Jira issue.'},
    {name:'add_comment',          desc:'Add a comment to a Jira issue with optional visibility restrictions. Examples: - Simple com...'},
    {name:'get_issue_worklogs',   desc:'Get worklog for a specific Jira issue.'}
  ];

  // ── Sidebar nav row factory ──
  function navRow(label, opts){
    opts=opts||{};
    var active=!!opts.active;
    var dim=!!opts.dim;
    return R('div',{style:{
      display:'flex',alignItems:'center',gap:'10px',
      padding:'7px 10px',borderRadius:'6px',
      background:active?'#EEF1F5':'transparent',
      fontSize:'12.5px',
      fontWeight:active?700:600,
      color:active?'#111928':(dim?'#9CA3AF':'#42526E')
    }},
      R('div',{style:{width:14,height:14,borderRadius:'3px',background:active?'#D1D5DB':'#E5E7EB',flexShrink:0}}),
      R('span',null,label)
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},

    // ─── Eyebrow + Title (stay throughout) ──────────────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'70px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'IN FLOWHUNT · MCP SERVERS'),
    R('div',{style:{position:'absolute',left:'50%',top:'108px',transform:'translateX(-50%)',fontSize:'40px',fontWeight:800,color:'#111928'}},'Wire up the Atlassian Jira MCP server.'),

    // ─── Chrome browser window (visible throughout) ─────────────────
    R('div',{style:{position:'absolute',left:'50%',top:'160px',width:'1700px',height:'780px',transform:'translateX(-50%)',background:'#FFFFFF',borderRadius:'12px',overflow:'hidden',boxShadow:'0 30px 70px rgba(17,25,40,0.30)',opacity:chromeP,border:'1px solid #D1D5DB'}},

      // Chrome chrome bar — traffic lights + tab
      R('div',{style:{height:'44px',background:'#DEE1E6',display:'flex',alignItems:'flex-end',padding:'0 14px',gap:'4px',position:'relative'}},
        R('div',{style:{position:'absolute',left:14,top:14,width:13,height:13,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{position:'absolute',left:34,top:14,width:13,height:13,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{position:'absolute',left:54,top:14,width:13,height:13,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'90px',height:'34px',padding:'0 18px',background:'#F4F5F7',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',display:'flex',alignItems:'center',gap:'10px',fontSize:'14px',color:'#172B4D',fontWeight:600}},
          fhMark(14),
          R('span',null,'MCP Servers · FlowHunt')
        )
      ),

      // URL bar
      R('div',{style:{height:'48px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'14px'}},
        R('div',{style:{display:'flex',gap:'14px',color:'#9AA0A6',fontSize:'18px'}},
          R('span',null,'←'),R('span',null,'→'),R('span',null,'↻')
        ),
        R('div',{style:{flex:1,padding:'8px 16px',background:'#FFFFFF',border:'1px solid #DFE1E6',borderRadius:'20px',fontSize:'14px',color:'#42526E',display:'flex',alignItems:'center',gap:'10px'}},
          R('div',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E'}}),
          R('div',{style:{display:'inline-flex',alignItems:'center'}},
            R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
            R('span',{style:{color:'#6B7280'}},'/mcp-servers/jira')
          )
        )
      ),

      // Body — sidebar + main pane
      R('div',{style:{display:'flex',height:'768px',background:'#FFFFFF'}},

        // ── Sidebar (210px) ──
        R('div',{style:{flex:'0 0 210px',background:'#FAFBFC',borderRight:'1px solid #E5E7EB',padding:'16px 12px',display:'flex',flexDirection:'column',gap:'10px',height:'100%',overflow:'hidden'}},

          // FlowHunt logo
          R('div',{style:{display:'flex',alignItems:'center',gap:'8px',padding:'4px 6px'}},
            fhMark(20),
            R('div',{style:{display:'flex',alignItems:'center',fontSize:'16px',fontWeight:800,letterSpacing:'-0.3px'}},
              R('span',{style:{color:'#111928'}},'Flow'),
              R('span',{style:{background:grad,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}},'Hunt')
            )
          ),

          // Workspace block
          R('div',{style:{marginTop:'4px',padding:'10px 10px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'8px',display:'flex',alignItems:'center',gap:'8px'}},
            R('div',{style:{width:24,height:24,borderRadius:'6px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontSize:'11px',flexShrink:0}},'E'),
            R('div',{style:{flex:1,minWidth:0,overflow:'hidden'}},
              R('div',{style:{fontSize:'11.5px',fontWeight:700,color:'#111928',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},'Example Workspace'),
              R('div',{style:{fontSize:'10px',color:'#6B7280',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},'you@example.com')
            ),
            R('span',{style:{color:'#9CA3AF',fontSize:'10px'}},'▾')
          ),

          // Section header: Agent
          R('div',{style:{fontSize:'10px',fontWeight:800,color:'#9CA3AF',letterSpacing:'0.08em',marginTop:'6px',padding:'0 8px'}},'AGENT'),

          // Nav rows
          navRow('Home'),
          navRow('Agents Library'),
          navRow('My Agents'),
          navRow('MCP Servers', {active:true}),
          navRow('Chatbots'),
          navRow('History'),
          navRow('Integrations'),

          // Section header: Knowledge sources
          R('div',{style:{fontSize:'10px',fontWeight:800,color:'#9CA3AF',letterSpacing:'0.08em',marginTop:'8px',padding:'0 8px'}},'KNOWLEDGE SOURCES'),
          navRow('Documents', {dim:true}),
          navRow('Categories', {dim:true}),

          // Section header: Workspace
          R('div',{style:{fontSize:'10px',fontWeight:800,color:'#9CA3AF',letterSpacing:'0.08em',marginTop:'8px',padding:'0 8px'}},'WORKSPACE'),
          navRow('Settings', {dim:true}),
          navRow('Billing', {dim:true})
        ),

        // ── Main pane ──
        R('div',{style:{flex:1,display:'flex',flexDirection:'column',padding:'18px 28px 22px 28px',minWidth:0,overflow:'hidden'}},

          // Breadcrumb
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:600}},
            R('span',null,'MCP Servers'),
            R('span',{style:{color:'#9CA3AF',margin:'0 6px'}},'>'),
            R('span',{style:{color:'#111928',fontWeight:700}},'Jira')
          ),

          // Page header with Atlassian mark + title + status
          R('div',{style:{marginTop:'10px',display:'flex',alignItems:'center',gap:'12px'}},
            atlassianMark(28),
            R('div',{style:{fontSize:'22px',fontWeight:800,color:'#111928',letterSpacing:'-0.2px'}},'Jira'),
            R('div',{style:{display:'flex',alignItems:'center',gap:'6px',padding:'3px 9px',background:'#DCFCE7',color:'#047857',fontSize:'10.5px',fontWeight:800,borderRadius:'999px'}},
              R('span',{style:{width:6,height:6,borderRadius:'50%',background:'#10B981',display:'inline-block'}}),
              R('span',null,'Active')
            ),
            R('div',{style:{marginLeft:'auto',fontSize:'11.5px',color:'#6B7280'}},'Atlassian Jira MCP Server')
          ),

          // Tab strip with animated underline
          R('div',{style:{marginTop:'12px',position:'relative',display:'flex',gap:'28px',borderBottom:'1px solid #E5E7EB'}},
            R('div',{style:{padding:'8px 2px',fontSize:'14px',fontWeight:tabSwap<0.5?800:600,color:tabSwap<0.5?'#0084FF':'#6B7280'}},'Configure'),
            R('div',{style:{padding:'8px 2px',fontSize:'14px',fontWeight:tabSwap>=0.5?800:600,color:tabSwap>=0.5?'#0084FF':'#6B7280'}},'Connect'),
            // Animated underline
            R('div',{style:{position:'absolute',bottom:'-1px',left:underlineLeft+'px',width:underlineWidth+'px',height:'2px',background:'#0084FF',borderRadius:'2px'}})
          ),

          // ── Content area: stacked panes, opacity-swapped ──
          R('div',{style:{flex:1,position:'relative',minHeight:0,marginTop:'14px'}},

            // ===== Configure pane =====
            configPaneOpacity>0.005?R('div',{style:{position:'absolute',inset:0,display:'flex',flexDirection:'column',gap:'12px',opacity:configPaneOpacity}},

              // Capabilities header row
              R('div',{style:{opacity:configHeadP,display:'flex',alignItems:'center',gap:'12px'}},
                R('div',null,
                  R('div',{style:{fontSize:'16px',fontWeight:800,color:'#111928'}},'Capabilities'),
                  R('div',{style:{marginTop:'2px',fontSize:'12px',color:'#6B7280'}},'What your MCP server can do. Add or remove tools that agents can invoke.')
                ),
                R('div',{style:{marginLeft:'auto',padding:'8px 14px',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'8px',fontSize:'12.5px',fontWeight:700,color:'#172B4D'}},'+ Add capability')
              ),

              // Sub-header
              R('div',{style:{opacity:configHeadP,display:'flex',alignItems:'center',gap:'10px',marginTop:'4px'}},
                atlassianMark(20),
                R('div',{style:{fontSize:'13.5px',fontWeight:800,color:'#111928'}},'Atlassian Jira MCP Server'),
                R('div',{style:{marginLeft:'auto',fontSize:'11px',color:'#6B7280',fontWeight:600}},'12 of 34 shown')
              ),

              // Scrolling viewport with cards
              R('div',{style:{flex:1,minHeight:0,position:'relative',overflow:'hidden',background:'#FAFAFB',border:'1px solid #E5E7EB',borderRadius:'12px',opacity:configListP}},
                R('div',{style:{position:'absolute',left:0,right:0,top:0,padding:'14px 14px',transform:'translateY('+scrollY+'px)',display:'flex',flexDirection:'column',gap:'8px'}},
                  capabilities.map(function(cap,i){
                    return R('div',{key:i,style:{padding:'12px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'10px',display:'flex',alignItems:'flex-start',gap:'12px'}},
                      R('div',{style:{flex:'0 0 22px',marginTop:'2px'}}, atlassianMark(22)),
                      R('div',{style:{flex:1,minWidth:0}},
                        R('div',{style:{fontSize:'13.5px',fontWeight:800,color:'#111928',fontFamily:'JetBrains Mono,monospace'}}, cap.name),
                        R('div',{style:{marginTop:'3px',fontSize:'12px',color:'#6B7280',lineHeight:1.5}}, cap.desc)
                      ),
                      R('div',{style:{padding:'3px 8px',background:'#DCFCE7',color:'#047857',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.04em',flexShrink:0}},'ENABLED')
                    );
                  })
                ),
                // Soft top/bottom fades so rows feel like they're scrolling under a window
                R('div',{style:{position:'absolute',left:0,right:0,top:0,height:'24px',background:'linear-gradient(180deg,#FAFAFB,rgba(250,250,251,0))',pointerEvents:'none'}}),
                R('div',{style:{position:'absolute',left:0,right:0,bottom:0,height:'24px',background:'linear-gradient(0deg,#FAFAFB,rgba(250,250,251,0))',pointerEvents:'none'}})
              )
            ):null,

            // ===== Connect pane =====
            connectPaneOpacity>0.005?R('div',{style:{position:'absolute',inset:0,display:'flex',gap:'22px',opacity:connectPaneOpacity}},

              // LEFT (~58%): client + blurb + code card
              R('div',{style:{flex:'0 0 820px',display:'flex',flexDirection:'column',gap:'12px'}},

                // Client dropdown
                R('div',{style:{opacity:clientP}},
                  R('div',{style:{fontSize:'11px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em'}},'CLIENT'),
                  R('div',{style:{marginTop:'6px',padding:'10px 14px',border:'1.5px solid #D1D5DB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px',background:'#FFFFFF',maxWidth:'320px'}},
                    R('div',{style:{width:18,height:18,borderRadius:'50%',border:'1.5px solid #D1D5DB',background:'#FFFFFF',flexShrink:0}}),
                    R('div',{style:{width:22,height:22,borderRadius:'5px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontSize:'11px',flexShrink:0}},'F'),
                    R('div',{style:{flex:1,fontSize:'13px',fontWeight:700,color:'#111928'}},'FlowHunt'),
                    R('div',{style:{color:'#9CA3AF',fontSize:'12px'}},'▾')
                  )
                ),

                // Connect to FlowHunt sub-heading with faint circle
                R('div',{style:{opacity:blurbP,display:'flex',alignItems:'center',gap:'10px',marginTop:'4px'}},
                  R('div',{style:{width:18,height:18,borderRadius:'50%',border:'1.5px solid #D1D5DB',background:'#FFFFFF',flexShrink:0}}),
                  R('div',{style:{fontSize:'18px',fontWeight:800,color:'#111928'}},'Connect to FlowHunt')
                ),

                // Blurb
                R('div',{style:{opacity:blurbP,marginTop:'-2px',fontSize:'12px',color:'#4B5563',lineHeight:1.55,maxWidth:'780px'}},
                  'Connect your MCP Server to FlowHunt AI Agent and use it in your organization. Authentication uses an ',
                  R('span',{style:{fontFamily:'JetBrains Mono,monospace',padding:'1px 5px',background:'#F3F4F6',borderRadius:'4px',color:'#111928'}},'Authorization: Bearer YOUR_API_KEY'),
                  ' header - the URL itself never contains the secret.'
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

                // Create preconfigured agent section
                R('div',{style:{opacity:agentCardP,transform:'translateY('+(8*(1-agentCardP))+'px)',display:'flex',flexDirection:'column',gap:'8px'}},
                  R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'Create preconfigured agent'),
                  R('div',{style:{fontSize:'11.5px',color:'#6B7280',lineHeight:1.5}},'Click button below to create agent with MCP Client configured for this MCP Server.'),

                  // Card with FH mark + AI Agent with MCP + Business pill
                  R('div',{style:{marginTop:'4px',padding:'14px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',boxShadow:'0 6px 18px rgba(17,25,40,0.06)'}},
                    R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
                      R('div',{style:{width:34,height:34,borderRadius:'8px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
                        fhMark(18)
                      ),
                      R('div',{style:{flex:1,minWidth:0}},
                        R('div',{style:{fontSize:'13.5px',fontWeight:800,color:'#111928'}},'AI Agent with MCP'),
                        R('div',{style:{fontSize:'11px',color:'#6B7280',marginTop:'1px'}},'Preconfigured with Jira tools')
                      ),
                      R('div',{style:{padding:'3px 9px',background:'#DCFCE7',color:'#047857',fontSize:'10.5px',fontWeight:800,borderRadius:'999px'}},'Business')
                    ),
                    // + Create AI Agent pulsing button
                    R('div',{style:{marginTop:'12px',display:'flex',justifyContent:'flex-start'}},
                      R('div',{style:{padding:'10px 18px',background:'linear-gradient(90deg,#0084FF,#1A56DB)',color:'#FFFFFF',fontSize:'12.5px',fontWeight:800,borderRadius:'8px',boxShadow:'0 0 0 '+(3+10*agentGlow)+'px rgba(0,132,255,0.18), 0 6px 14px rgba(0,82,204,0.28)'}},'+ Create AI Agent')
                    )
                  )
                )
              )
            ):null
          )
        )
      )
    )
  );
}`;

// 3-line summary
// FlowHuntMcpServerScene v2: a 285-frame Scene 6 replacement that lives entirely inside ONE Chrome browser window with the FlowHunt sidebar visible throughout (workspace block, Agent/Knowledge sources/Workspace nav with "MCP Servers" highlighted).
// The main pane shows breadcrumb "MCP Servers > Jira" with a Configure | Connect tab strip whose blue underline animates from Configure to Connect at f=155–175; Configure pane (Phase A) renders a Capabilities section listing 12 Jira tools as cards with the Atlassian mark, mono tool name and muted description, scrolled via translateY(-360px) inside an overflow:hidden viewport.
// Connect pane (Phase C) renders the Client dropdown ("FlowHunt"), "Connect to FlowHunt" subheading with blurb, dark JSON config card with Copy click flash + "Copied" tooltip at f=220, yellow Caution callout, and a "Create preconfigured agent" card whose "+ Create AI Agent" button uses the same phase-integrated fast→slow pulse (pulseStart=215, fastEnd=230, fastFreq=0.22, slowFreq=0.085); uses literal ${HELPERS}/${ATLASSIAN_MARK}/${FH_MARK_PATH} placeholders, no other files modified.

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

/* ============================================================================
 * FlowHuntBridgeScene v2 (270f, 9s) - Scene 7 replacement snippet.
 *
 * Two side-by-side surfaces both consume the same MCP server config:
 *   LEFT  - Claude Code terminal running `claude mcp add jira ...` (UNCHANGED
 *           from the previous version - left terminal block is verbatim).
 *   RIGHT - FlowHunt's browser, now showing the FULL agent editor:
 *             - FlowHunt page header bar inside the browser body.
 *             - Agent canvas with three vertical nodes
 *                 (Chat Input -> AI Agent -> Chat Output)
 *               and the Configure Tool: MCP Client modal + nested
 *               External MCP Servers modal floating over it.
 *             - Right-side AI Agent config panel showing the agent has
 *               the MCP Client tool selected (the visual proof requested
 *               by the user).
 *
 * Phase layout (frame-local):
 *   0-22     surfaces fade in together with caption labels.
 *   22-118   terminal types; right side reveals page header, canvas,
 *            right config panel, then the two stacked modals.
 *   200-260  Save button outer glow pulses (fast->slow phase-integrated).
 *   250-270  scene-out fade.
 *
 * HELPERS, CLAUDE_ICON and ATLASSIAN_MARK are interpolated from the parent
 * build.mjs scope - the same template-literal mechanism the other scenes use.
 * ========================================================================== */

const FlowHuntBridgeScene = `function FlowHuntBridgeScene(props){${HELPERS}
  var f=props.frame||0;
  var END=270;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));

  // ─── Surfaces fade in together (same formula as previous version) ──
  var surfP=ease(cl(f/22));
  var surfRise=18*(1-surfP);

  // ── LEFT terminal — /mcp verification flow ──
  // The user added the Jira MCP locally by pasting the SAME JSON config the
  // FlowHunt Connect tab gave them (no claude-mcp-add one-liner). Now they
  // run /mcp to verify it shows up. The terminal renders the "Manage MCP
  // servers" panel with Jira connected at 34 tools, highlighted as the new row.
  var slashCmd='/mcp';
  var typeStart=20, typeDur=20;
  var slashTyped=slashCmd.slice(0, Math.floor(cl((f-typeStart)/typeDur)*slashCmd.length));
  var slashCaret=f>=typeStart && (Math.floor((f-typeStart)/8))%2===0 && f<typeStart+typeDur+20;
  function lineAt(d,dur){return ease(cl((f-d)/(dur||10)));}
  var mgrHeadP=lineAt(60,12);    // "Manage MCP servers" header
  var userHdrP=lineAt(82,10);    // "User MCPs" sub-header (only section we show)
  var jiraRowP=lineAt(96,14);    // Jira row (highlighted — the just-added one)
  var clHdrP=lineAt(140,10);     // "claude.ai" sub-header
  var clR1P=lineAt(152,10);      // Gmail row
  var biHdrP=lineAt(176,10);     // "Built-in MCPs"
  var biR1P=lineAt(186,10);
  // Subtle pulse on the Jira row's check pill to point out the new addition.
  var jiraGlow=0.5+0.5*Math.sin((f-96)*0.18);

  // ── RIGHT FlowHunt browser reveal staggers ──
  var browserP=surfP;            // browser appears with the left terminal
  var pageHeadP=ease(cl((f-26)/16));   // FlowHunt page header bar
  var canvasP=ease(cl((f-34)/18));     // dotted canvas + nodes appear
  var sidebarP=ease(cl((f-44)/20));    // right AI Agent config panel
  var toolRowP=ease(cl((f-70)/16));    // MCP Client tool row highlights
  var outerModalP=ease(cl((f-86)/20)); // Configure Tool: MCP Client modal
  var innerModalP=ease(cl((f-118)/20));// nested External MCP Servers modal
  var saveBtnP=ease(cl((f-140)/16));   // save button row inside inner modal

  // ─── Save-button pulse (fast→slow phase-integrated) ───────────────
  // Same phase-integrated formula and timing values as the previous scene.
  var pulseStart=200;
  var fastEnd=230;
  var fastFreq=0.22, slowFreq=0.085;
  var pulsePhase = f<=fastEnd
    ? (f-pulseStart)*fastFreq
    : (fastEnd-pulseStart)*fastFreq + (f-fastEnd)*slowFreq;
  var savePulse=0.5+0.5*Math.sin(pulsePhase);
  var pulseGate=cl((f-pulseStart)/14);

  // Layout — terminal is ~1/3 of the width, FlowHunt browser is ~2/3
  // so the agent editor inside the Chrome reads at proper proportions
  // (chat output, AI agent panel, etc. all visible at sensible sizes).
  // Both surfaces start at the SAME y so captions + surface borders
  // align. Pushed further down so they sit closer to the FlowHunt
  // wordmark at y≈994 and further from the Local/Online caption
  // pills above. Bottoms land at y=940, ~54px clear of watermark.
  var captionY=200;
  var surfTopY=240;
  var termX=40,  termY=surfTopY, termW=600,  termH=700;
  var fhX=660,   fhY=surfTopY,   fhW=1220,   fhH=700;

  function span(t,c){return R('span',{style:{color:c}},t);}

  // Tiny Atlassian "A" mark — small inline SVG-style tile.
  // We use the inlined PNG asset to match the rest of the scenes.
  function atlassianMark(size){
    var s=size||16;
    return R('img',{src:'${ATLASSIAN_MARK}',width:s,height:s,style:{display:'block',borderRadius:'3px'}});
  }

  // ─── FlowHunt node-type icon set (matches the real agent editor) ──
  // Chat Input  — green tile, white chat bubble + 3 typing dots
  function chatInputIcon(size){
    var s=size||28;
    var sw=Math.round(s*0.62);
    return R('div',{style:{width:s,height:s,borderRadius:'7px',background:'linear-gradient(135deg,#10B981,#047857)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 2px 4px rgba(16,185,129,0.30)'}},
      R('svg',{width:sw,height:sw,viewBox:'0 0 24 24',fill:'none'},
        R('path',{d:'M4 5 a2 2 0 0 1 2-2 h12 a2 2 0 0 1 2 2 v9 a2 2 0 0 1-2 2 H10 l-4 4 v-4 H6 a2 2 0 0 1-2-2 z',fill:'#FFFFFF'}),
        R('circle',{cx:9,cy:10,r:1.3,fill:'#047857'}),
        R('circle',{cx:13,cy:10,r:1.3,fill:'#047857'}),
        R('circle',{cx:17,cy:10,r:1.3,fill:'#047857'})
      )
    );
  }
  // Chat Output — red tile, white chat bubble + reply-arrow
  function chatOutputIcon(size){
    var s=size||28;
    var sw=Math.round(s*0.62);
    return R('div',{style:{width:s,height:s,borderRadius:'7px',background:'linear-gradient(135deg,#EF4444,#DC2626)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 2px 4px rgba(239,68,68,0.30)'}},
      R('svg',{width:sw,height:sw,viewBox:'0 0 24 24',fill:'none'},
        R('path',{d:'M4 5 a2 2 0 0 1 2-2 h12 a2 2 0 0 1 2 2 v9 a2 2 0 0 1-2 2 H10 l-4 4 v-4 H6 a2 2 0 0 1-2-2 z',fill:'#FFFFFF'}),
        R('path',{d:'M8 10 L15 10 M13 8 L15 10 L13 12',stroke:'#DC2626',strokeWidth:1.8,fill:'none',strokeLinecap:'round',strokeLinejoin:'round'})
      )
    );
  }
  // AI Agent — magenta tile, white robot head w/ antenna + eye holes
  function aiAgentIcon(size){
    var s=size||30;
    var sw=Math.round(s*0.74);
    return R('div',{style:{width:s,height:s,borderRadius:'7px',background:'linear-gradient(135deg,#B91C5C,#E11D74)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 2px 6px rgba(225,29,116,0.35)'}},
      R('svg',{width:sw,height:sw,viewBox:'0 0 24 24',fill:'none'},
        R('rect',{x:11.2,y:2.5,width:1.6,height:3,fill:'#FFFFFF'}),
        R('circle',{cx:12,cy:2.5,r:1.2,fill:'#FFFFFF'}),
        R('rect',{x:5,y:6.5,width:14,height:13,rx:2.5,fill:'#FFFFFF'}),
        R('circle',{cx:9,cy:12.5,r:1.5,fill:'#B91C5C'}),
        R('circle',{cx:15,cy:12.5,r:1.5,fill:'#B91C5C'}),
        R('rect',{x:9,y:16,width:6,height:1.4,rx:0.7,fill:'#B91C5C'})
      )
    );
  }
  // MCP Client paperclip — light pink tile, magenta paperclip
  function mcpClientIcon(size){
    var s=size||28;
    var sw=Math.round(s*0.6);
    return R('div',{style:{width:s,height:s,borderRadius:'6px',background:'#FCE7F3',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:'1px solid #F9C4DC'}},
      R('svg',{width:sw,height:sw,viewBox:'0 0 24 24',fill:'none',stroke:'#E11D74',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'},
        R('path',{d:'M16 6 L8.5 13.5 a3 3 0 0 0 4.2 4.2 L20 10.5 a5 5 0 0 0 -7 -7 L5 11.5 a7 7 0 0 0 10 10'})
      )
    );
  }

  return R('div',{style:{width:'100%',height:'100%',background:'#FFFFFF',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op,overflow:'hidden'}},

    // ─── Header strip (tightened wording per user feedback) ─────────
    R('div',{style:{position:'absolute',left:'50%',top:'62px',transform:'translateX(-50%)',fontSize:'13px',fontWeight:700,color:'#6B7280',letterSpacing:'2px',opacity:surfP}},'THE SAME MCP, BOTH SIDES'),
    R('div',{style:{position:'absolute',left:'50%',top:'94px',transform:'translateX(-50%)',fontSize:'36px',fontWeight:800,color:'#111928',letterSpacing:'-0.4px',opacity:surfP}},'One server. Use it locally or inside a FlowHunt agent.'),

    // ─── Caption labels above each surface (from frame 0) ───────────
    R('div',{style:{position:'absolute',left:(termX+termW/2)+'px',top:captionY+'px',transform:'translateX(-50%) translateY('+(8*(1-surfP))+'px)',opacity:surfP,padding:'7px 18px',background:'linear-gradient(90deg,rgba(15,23,42,0.94),rgba(30,41,59,0.94))',color:'#F8FAFC',borderRadius:'999px',fontSize:'14px',fontWeight:700,whiteSpace:'nowrap',boxShadow:'0 8px 22px rgba(17,25,40,0.18)',display:'flex',alignItems:'center',gap:'10px',zIndex:10}},
      R('span',{style:{width:8,height:8,borderRadius:'50%',background:'#22C55E',display:'inline-block'}}),
      R('span',null,'Local: Claude Code')
    ),
    R('div',{style:{position:'absolute',left:(fhX+fhW/2)+'px',top:captionY+'px',transform:'translateX(-50%) translateY('+(8*(1-surfP))+'px)',opacity:surfP,padding:'7px 18px',background:'linear-gradient(90deg,#0084FF,#1A56DB)',color:'#FFFFFF',borderRadius:'999px',fontSize:'14px',fontWeight:700,whiteSpace:'nowrap',boxShadow:'0 8px 22px rgba(0,82,204,0.28)',display:'flex',alignItems:'center',gap:'10px',zIndex:10}},
      R('span',{style:{width:8,height:8,borderRadius:'50%',background:'#FFFFFF',display:'inline-block'}}),
      R('span',null,'Online: FlowHunt agent')
    ),

    // ─── LEFT — Claude Code terminal (UNCHANGED) ────────────────────
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
      R('div',{style:{padding:'26px 28px',fontFamily:'JetBrains Mono,monospace',fontSize:'13px',lineHeight:1.55,color:'#E2E8F0'}},

        // Prompt + /mcp slash command
        R('div',null,
          span('> ', '#22C55E'),
          R('span',null, slashTyped),
          slashCaret?R('span',{style:{display:'inline-block',width:8,height:15,background:'#E2E8F0',marginLeft:2,verticalAlign:'middle'}}):null
        ),

        // ── "Manage MCP servers" header ──
        mgrHeadP>0.01?R('div',{style:{marginTop:20,opacity:mgrHeadP,color:'#7DD3FC',fontWeight:700,textDecoration:'underline'}},'Manage MCP servers'):null,
        mgrHeadP>0.01?R('div',{style:{marginTop:2,opacity:mgrHeadP,color:'#94A3B8'}},'1 user server · 3 built-in'):null,

        // ── User MCPs — Jira lives here, highlighted as the just-added row ──
        userHdrP>0.01?R('div',{style:{marginTop:16,opacity:userHdrP,color:'#F8FAFC',fontWeight:700}},'User MCPs ',R('span',{style:{color:'#64748B',fontWeight:400}},'(~/.claude.json)')):null,

        jiraRowP>0.01?R('div',{style:{marginTop:4,opacity:jiraRowP,paddingLeft:12,paddingRight:8,paddingTop:6,paddingBottom:6,background:'rgba(34,197,94,0.10)',borderLeft:'2px solid #22C55E',borderRadius:'4px',display:'flex',alignItems:'center',gap:'8px',boxShadow:'0 0 '+(8+10*jiraGlow)+'px rgba(34,197,94,0.18)'}},
          R('span',{style:{color:'#94A3B8'}},'›'),
          R('span',{style:{color:'#FBBF24',fontWeight:700}},'Jira'),
          R('span',{style:{color:'#64748B'}},'·'),
          R('span',{style:{color:'#22C55E'}},'✓'),
          R('span',{style:{color:'#22C55E',fontWeight:700}},'connected'),
          R('span',{style:{color:'#64748B'}},'·'),
          R('span',{style:{color:'#E2E8F0'}},'34 tools'),
          R('span',{style:{marginLeft:'auto',padding:'2px 8px',background:'rgba(34,197,94,0.20)',color:'#86EFAC',fontSize:'11px',fontWeight:700,borderRadius:'4px',letterSpacing:'0.04em'}},'JUST ADDED')
        ):null,

        // ── claude.ai (built-in connectors) ──
        clHdrP>0.01?R('div',{style:{marginTop:16,opacity:clHdrP,color:'#F8FAFC',fontWeight:700}},'claude.ai'):null,
        clR1P>0.01?R('div',{style:{marginTop:4,opacity:clR1P,paddingLeft:16,display:'flex',alignItems:'center',gap:'8px'}},
          R('span',{style:{color:'#E2E8F0'}},'claude.ai Gmail'),
          R('span',{style:{color:'#64748B'}},'·'),
          R('span',{style:{color:'#FBBF24'}},'△'),
          R('span',{style:{color:'#94A3B8'}},'needs authentication')
        ):null,

        // ── Built-in MCPs ──
        biHdrP>0.01?R('div',{style:{marginTop:16,opacity:biHdrP,color:'#F8FAFC',fontWeight:700}},'Built-in MCPs ',R('span',{style:{color:'#64748B',fontWeight:400}},'(always available)')):null,
        biR1P>0.01?R('div',{style:{marginTop:2,opacity:biR1P,paddingLeft:16,display:'flex',alignItems:'center',gap:'8px'}},
          R('span',{style:{color:'#E2E8F0'}},'computer-use'),
          R('span',{style:{color:'#64748B'}},'·'),
          R('span',{style:{color:'#F87171'}},'○'),
          R('span',{style:{color:'#94A3B8'}},'disabled')
        ):null
      )
    ):null,

    // ─── RIGHT — FlowHunt Chrome browser window (REWRITTEN) ─────────
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
          R('div',{style:{display:'inline-flex',alignItems:'center'}},
            R('span',{style:{color:'#172B4D'}},'app.flowhunt.io'),
            R('span',{style:{color:'#6B7280'}},'/agents/jira/edit')
          )
        )
      ),

      // FlowHunt page-level header bar (logo + breadcrumb + version pill)
      R('div',{style:{height:'36px',background:'#FFFFFF',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',padding:'0 16px',gap:'14px',opacity:pageHeadP}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'8px'}},
          R('div',{style:{width:20,height:20,borderRadius:'5px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'10px',fontWeight:800}},'FH'),
          R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928',letterSpacing:'-0.2px'}},'FlowHunt')
        ),
        R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:600,display:'flex',alignItems:'center',gap:'6px'}},
          R('span',null,'Agents'),
          R('span',{style:{color:'#9CA3AF'}},'›'),
          R('span',null,'Jira'),
          R('span',{style:{color:'#9CA3AF'}},'›'),
          R('span',{style:{color:'#111928',fontWeight:700}},'Edit')
        ),
        R('div',{style:{marginLeft:'auto',display:'flex',alignItems:'center',gap:'8px'}},
          R('div',{style:{padding:'3px 8px',background:'#EFF6FF',color:'#1A56DB',fontSize:'10px',fontWeight:800,borderRadius:'4px',letterSpacing:'0.04em'}},'VERSION: 3'),
          R('div',{style:{padding:'3px 10px',background:'linear-gradient(90deg,#0084FF,#1A56DB)',color:'#FFFFFF',fontSize:'10px',fontWeight:800,borderRadius:'4px'}},'SAVE')
        )
      ),

      // Page body — split: canvas (left ~70%) + AI Agent config panel (right ~30%)
      R('div',{style:{position:'relative',height:'calc(100% - 118px)',display:'flex',overflow:'hidden'}},

        // ── LEFT-OF-RIGHT: agent canvas (dotted grid + nodes + floating modals)
        R('div',{style:{flex:1,position:'relative',background:'#F9FAFB',backgroundImage:'radial-gradient(circle, #D1D5DB 1px, transparent 1px)',backgroundSize:'18px 18px',overflow:'hidden'}},

          // Three vertical nodes connected by dashed lines.
          // We position them absolutely so the connecting lines line up.
          // Repositioned so the stack sits more centrally in the canvas
          // and the dashed connectors actually reach each node (the old
          // bottom connector had a big gap below the AI Agent).
          //   Chat Input  top:80  (height ~48, bottom ~128)
          //   AI Agent    top:212 (height ~56, bottom ~268)
          //   Chat Output top:392 (height ~48, bottom ~440)

          // Dashed connector — Chat Input → AI Agent (extended so AI Agent is centred)
          canvasP>0.005?R('div',{style:{position:'absolute',left:'50%',top:'128px',width:'2px',height:'104px',transform:'translateX(-50%)',borderLeft:'2px dashed #9CA3AF',opacity:canvasP*0.7}}):null,
          // Dashed connector — AI Agent → Chat Output (matching height the other side)
          canvasP>0.005?R('div',{style:{position:'absolute',left:'50%',top:'288px',width:'2px',height:'104px',transform:'translateX(-50%)',borderLeft:'2px dashed #9CA3AF',opacity:canvasP*0.7}}):null,

          // Node 1: Chat Input (green, real chat-bubble icon)
          canvasP>0.005?R('div',{style:{position:'absolute',left:'50%',top:'80px',transform:'translateX(-50%) translateY('+(8*(1-canvasP))+'px)',width:'240px',padding:'10px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',boxShadow:'0 4px 12px rgba(17,25,40,0.06)',display:'flex',alignItems:'center',gap:'12px',opacity:canvasP}},
            chatInputIcon(28),
            R('div',{style:{flex:1,minWidth:0}},
              R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'Chat Input'),
              R('div',{style:{marginTop:'2px',fontSize:'10px',color:'#6B7280'}},'Entry point')
            ),
            R('div',{style:{width:9,height:9,borderRadius:'50%',background:'#FFFFFF',border:'2px solid #9CA3AF'}})
          ):null,

          // Node 2: AI Agent — centred between Chat Input and Chat Output
          canvasP>0.005?R('div',{style:{position:'absolute',left:'50%',top:'232px',transform:'translateX(-50%) translateY('+(8*(1-canvasP))+'px)',width:'260px',padding:'12px 14px 10px 14px',background:'#FFFFFF',border:'2px dashed #E11D74',borderRadius:'12px',boxShadow:'0 6px 18px rgba(225,29,116,0.18)',opacity:canvasP,zIndex:2}},
            R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
              aiAgentIcon(30),
              R('div',{style:{flex:1,minWidth:0}},
                R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'AI Agent'),
                R('div',{style:{marginTop:'2px',fontSize:'10px',color:'#6B7280'}},'Reasoning + tools')
              ),
              R('div',{style:{padding:'2px 6px',background:'#FCE7F3',color:'#B91C5C',fontSize:'9px',fontWeight:800,borderRadius:'4px'}},'ACTIVE')
            )
          ):null,

          // Node 3: Chat Output (red, real chat-bubble + reply-arrow icon)
          canvasP>0.005?R('div',{style:{position:'absolute',left:'50%',top:'392px',transform:'translateX(-50%) translateY('+(8*(1-canvasP))+'px)',width:'240px',padding:'10px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px',boxShadow:'0 4px 12px rgba(17,25,40,0.06)',display:'flex',alignItems:'center',gap:'12px',opacity:canvasP}},
            chatOutputIcon(28),
            R('div',{style:{flex:1,minWidth:0}},
              R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'Chat Output'),
              R('div',{style:{marginTop:'2px',fontSize:'10px',color:'#6B7280'}},'Reply to user')
            ),
            R('div',{style:{width:9,height:9,borderRadius:'50%',background:'#FFFFFF',border:'2px solid #9CA3AF'}})
          ):null,

          // ── Configure Tool: MCP Client modal (outer modal, floats over canvas)
          outerModalP>0.005?R('div',{style:{position:'absolute',left:'18px',right:'18px',top:'58px',bottom:'72px',background:'#FFFFFF',borderRadius:'12px',boxShadow:'0 20px 40px rgba(17,25,40,0.20)',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:outerModalP,zIndex:5}},
            // Title strip
            R('div',{style:{height:'40px',borderBottom:'1px solid #E5E7EB',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px'}},
              R('div',{style:{fontSize:'13px',fontWeight:800,color:'#111928'}},'Configure Tool: MCP Client'),
              R('div',{style:{fontSize:'16px',color:'#9CA3AF',fontWeight:600,lineHeight:1}},'×')
            ),
            // Body
            R('div',{style:{padding:'14px 18px',display:'flex',flexDirection:'column',gap:'12px',flex:1,minHeight:0}},
              R('div',{style:{fontSize:'11px',color:'#6B7280',lineHeight:1.45}},'Configure parameter values for this tool. P...'),
              // PARAMETER row header
              R('div',{style:{fontSize:'10px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em'}},'PARAMETER'),
              // MCP Configuration parameter row with Edit Servers button
              R('div',{style:{padding:'12px 14px',background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'12px'}},
                R('div',{style:{flex:1,minWidth:0}},
                  R('div',{style:{fontSize:'12px',fontWeight:800,color:'#111928'}},'MCP Configuration'),
                  R('div',{style:{marginTop:'2px',fontSize:'10px',color:'#6B7280',lineHeight:1.4}},'JSON configuration for MCP servers.')
                ),
                R('div',{style:{padding:'6px 12px',background:'#1A56DB',color:'#FFFFFF',fontSize:'10px',fontWeight:800,borderRadius:'6px'}},'Edit Servers')
              ),
              // Advanced Settings collapsed row
              R('div',{style:{padding:'10px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px'}},
                R('span',{style:{fontSize:'12px'}},'⚙'),
                R('span',{style:{flex:1,fontSize:'11px',fontWeight:700,color:'#111928'}},'Advanced Settings'),
                R('span',{style:{fontSize:'11px',color:'#9CA3AF'}},'▾')
              ),
              // Human-in-the-loop row
              R('div',{style:{padding:'10px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'10px',display:'flex',alignItems:'center',gap:'10px'}},
                R('div',{style:{flex:1,minWidth:0,display:'flex',alignItems:'center',gap:'8px'}},
                  R('span',{style:{fontSize:'11px',fontWeight:700,color:'#111928'}},'Human-in-the-Loop'),
                  R('span',{style:{padding:'2px 6px',background:'#FEF3C7',color:'#92400E',fontSize:'8px',fontWeight:800,borderRadius:'3px',letterSpacing:'0.04em'}},'COMING SOON')
                )
              ),
              // Bottom buttons row
              R('div',{style:{marginTop:'auto',display:'flex',justifyContent:'space-between',alignItems:'center'}},
                R('div',{style:{padding:'7px 14px',fontSize:'11px',fontWeight:700,color:'#42526E',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'6px',display:'flex',alignItems:'center',gap:'6px'}},
                  R('span',null,'←'),R('span',null,'Back')
                ),
                R('div',{style:{display:'flex',gap:'8px'}},
                  R('div',{style:{padding:'7px 14px',fontSize:'11px',fontWeight:700,color:'#42526E',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'6px'}},'Skip & Add'),
                  R('div',{style:{padding:'7px 14px',fontSize:'11px',fontWeight:800,color:'#FFFFFF',background:'#1A56DB',borderRadius:'6px'}},'Add with Config')
                )
              )
            )
          ):null,

          // ── Nested External MCP Servers modal (stacked over outer modal)
          // Wider so the pasted JSON config reads at a comfortable size.
          innerModalP>0.005?R('div',{style:{position:'absolute',left:'50%',top:'100px',transform:'translateX(-50%) translateY('+(10*(1-innerModalP))+'px)',width:'520px',background:'#FFFFFF',borderRadius:'12px',boxShadow:'0 24px 50px rgba(17,25,40,0.30)',border:'1px solid #E5E7EB',overflow:'hidden',display:'flex',flexDirection:'column',opacity:innerModalP,zIndex:8}},
            // Title strip
            R('div',{style:{padding:'14px 18px',borderBottom:'1px solid #F3F4F6',display:'flex',alignItems:'center',justifyContent:'space-between'}},
              R('div',{style:{fontSize:'14px',fontWeight:800,color:'#111928'}},'External MCP Servers'),
              R('div',{style:{fontSize:'16px',color:'#9CA3AF',fontWeight:600,lineHeight:1}},'×')
            ),
            // Body
            R('div',{style:{padding:'16px 20px',display:'flex',flexDirection:'column',gap:'14px'}},
              // Advanced Mode toggle (ON, blue) — matches the user's
              // actual configuration: they pasted the full JSON config.
              R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
                R('span',{style:{fontSize:'13px',fontWeight:700,color:'#111928'}},'Advanced Mode'),
                R('div',{style:{width:34,height:20,borderRadius:'10px',background:'#0084FF',padding:'2px',display:'flex',justifyContent:'flex-end',alignItems:'center',boxShadow:'inset 0 1px 2px rgba(0,82,204,0.18)'}},
                  R('div',{style:{width:16,height:16,borderRadius:'50%',background:'#FFFFFF',boxShadow:'0 1px 3px rgba(0,0,0,0.18)'}})
                )
              ),
              R('div',{style:{fontSize:'12px',color:'#6B7280',lineHeight:1.5}},'Here you can add additional configuration fields like OAuth settings, custom headers, or other parameters.'),

              // MCP Configuration JSON textarea (the pasted-in config)
              R('div',null,
                R('div',{style:{fontSize:'11px',fontWeight:800,color:'#374151',marginBottom:'6px',display:'flex',alignItems:'center',gap:'6px'}},
                  R('span',null,'MCP Configuration'),
                  R('span',{style:{display:'inline-block',width:14,height:14,borderRadius:'50%',border:'1px solid #9CA3AF',color:'#9CA3AF',fontSize:'9px',textAlign:'center',lineHeight:'12px',fontWeight:700}},'?')
                ),
                R('div',{style:{padding:'12px 14px',background:'#F9FAFB',border:'1.5px solid #0084FF',borderRadius:'8px',fontFamily:'JetBrains Mono,monospace',fontSize:'11px',lineHeight:1.55,color:'#1F2937',boxShadow:'0 0 0 3px rgba(0,132,255,0.10)'}},
                  R('div',null, span('{','#6B7280')),
                  R('div',{style:{paddingLeft:'10px'}},
                    span('"Jira"','#0084FF'), span(': {','#6B7280')
                  ),
                  R('div',{style:{paddingLeft:'22px'}},
                    span('"transport"','#0084FF'), span(': ','#6B7280'), span('"streamable_http"','#10B981'), span(',','#6B7280')
                  ),
                  R('div',{style:{paddingLeft:'22px',wordBreak:'break-all'}},
                    span('"url"','#0084FF'), span(': ','#6B7280'), span('"https://mcp.flowhunt.io/ff978d0f-545d-4df4-9d51-85ec1a22a14b"','#10B981'), span(',','#6B7280')
                  ),
                  R('div',{style:{paddingLeft:'22px'}},
                    span('"headers"','#0084FF'), span(': {','#6B7280')
                  ),
                  R('div',{style:{paddingLeft:'34px',wordBreak:'break-all'}},
                    span('"Authorization"','#0084FF'), span(': ','#6B7280'), span('"Bearer ********"','#10B981')
                  ),
                  R('div',{style:{paddingLeft:'22px'}}, span('}','#6B7280')),
                  R('div',{style:{paddingLeft:'10px'}}, span('}','#6B7280')),
                  R('div',null, span('}','#6B7280'))
                )
              ),

              // Buttons row (Cancel + Save with breathing pulse)
              R('div',{style:{marginTop:'4px',display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'10px',opacity:saveBtnP}},
                R('div',{style:{padding:'8px 20px',fontSize:'12px',fontWeight:700,color:'#42526E',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'6px'}},'Cancel'),
                R('div',{style:{padding:'8px 24px',fontSize:'12px',fontWeight:800,color:'#FFFFFF',background:'#1A56DB',borderRadius:'6px',boxShadow:'0 0 0 '+(2+10*savePulse*pulseGate)+'px rgba(0,132,255,0.22)'}},'Save')
              )
            )
          ):null
        ),

        // ── RIGHT-OF-RIGHT: AI Agent config sidebar (the proof) ──
        R('div',{style:{flex:'0 0 320px',background:'#FFFFFF',borderLeft:'1px solid #E5E7EB',display:'flex',flexDirection:'column',opacity:sidebarP,transform:'translateX('+(8*(1-sidebarP))+'px)',overflow:'hidden'}},

          // Magenta header strip
          R('div',{style:{padding:'12px 16px',background:'linear-gradient(90deg,#B91C5C,#E11D74)',color:'#FFFFFF',display:'flex',alignItems:'center',gap:'10px'}},
            R('div',{style:{width:24,height:24,borderRadius:'5px',background:'rgba(255,255,255,0.20)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}},
              R('svg',{width:14,height:14,viewBox:'0 0 24 24',fill:'none'},
                R('rect',{x:11.2,y:2.5,width:1.6,height:3,fill:'#FFFFFF'}),
                R('circle',{cx:12,cy:2.5,r:1.2,fill:'#FFFFFF'}),
                R('rect',{x:5,y:6.5,width:14,height:13,rx:2.5,fill:'#FFFFFF'}),
                R('circle',{cx:9,cy:12.5,r:1.5,fill:'#B91C5C'}),
                R('circle',{cx:15,cy:12.5,r:1.5,fill:'#B91C5C'})
              )
            ),
            R('div',{style:{flex:1,minWidth:0}},
              R('div',{style:{fontSize:'13px',fontWeight:800,letterSpacing:'-0.1px'}},'AI Agent'),
              R('div',{style:{marginTop:'2px',fontSize:'9px',opacity:0.85,lineHeight:1.35}},'An AI agent that can call tools to accomplish tasks.')
            )
          ),

          // Body sections — scrollable inner column
          R('div',{style:{flex:1,padding:'14px 16px',display:'flex',flexDirection:'column',gap:'14px',overflow:'hidden'}},

            // LLM section
            R('div',null,
              R('div',{style:{fontSize:'9px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em',marginBottom:'5px'}},'LLM'),
              R('div',{style:{padding:'8px 10px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'7px',display:'flex',alignItems:'center',gap:'8px'}},
                R('div',{style:{width:18,height:18,borderRadius:'4px',background:'linear-gradient(135deg,#D97757,#B85B3E)',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'9px',fontWeight:800,flexShrink:0}},'A'),
                R('div',{style:{flex:1,minWidth:0}},
                  R('div',{style:{fontSize:'10px',fontWeight:800,color:'#111928'}},'claude-4.5-haiku'),
                  R('div',{style:{fontSize:'8px',color:'#6B7280'}},'Anthropic')
                ),
                R('div',{style:{fontSize:'10px',color:'#9CA3AF'}},'▾')
              )
            ),

            // Input section
            R('div',null,
              R('div',{style:{fontSize:'9px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em',marginBottom:'5px'}},'INPUT'),
              R('div',{style:{padding:'8px 10px',background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:'7px',display:'flex',alignItems:'center',gap:'6px',minHeight:'24px'}},
                R('div',{style:{padding:'2px 8px',background:'#EFF6FF',color:'#1A56DB',fontSize:'9px',fontWeight:800,borderRadius:'10px',fontFamily:'JetBrains Mono,monospace'}},'{input}')
              )
            ),

            // Tools section — THE proof. MCP Client tool row highlighted.
            R('div',null,
              R('div',{style:{fontSize:'9px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em',marginBottom:'5px'}},'TOOLS'),
              // MCP Client tool row (highlighted magenta)
              R('div',{style:{padding:'8px 10px',background:'#FDF2F8',border:'1.5px solid #E11D74',borderRadius:'7px',display:'flex',alignItems:'center',gap:'8px',boxShadow:'0 2px 6px rgba(225,29,116,0.12)',opacity:toolRowP,transform:'translateY('+(6*(1-toolRowP))+'px)'}},
                mcpClientIcon(22),
                R('div',{style:{flex:1,minWidth:0}},
                  R('div',{style:{fontSize:'10px',fontWeight:800,color:'#111928'}},'MCP Client'),
                  R('div',{style:{fontSize:'8px',color:'#6B7280',marginTop:'1px'}},'1 locked param')
                ),
                R('div',{style:{padding:'2px 7px',background:'#FCE7F3',color:'#B91C5C',fontSize:'8px',fontWeight:800,borderRadius:'10px',letterSpacing:'0.04em'}},'TOOLS')
              ),
              // + Add Tool button
              R('div',{style:{marginTop:'6px',padding:'6px 10px',background:'#FFFFFF',border:'1px dashed #D1D5DB',borderRadius:'7px',fontSize:'10px',fontWeight:700,color:'#6B7280',textAlign:'center'}},'+ Add Tool')
            ),

            // System Message section
            R('div',null,
              R('div',{style:{fontSize:'9px',fontWeight:800,color:'#6B7280',letterSpacing:'0.08em',marginBottom:'5px'}},'SYSTEM MESSAGE'),
              R('div',{style:{padding:'7px 10px',background:'#F9FAFB',border:'1px solid #E5E7EB',borderRadius:'7px',fontSize:'10px',color:'#374151',lineHeight:1.4,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}},'You are a helpful assistant.')
            ),

            // Max Iterations
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{flex:1,fontSize:'10px',fontWeight:700,color:'#111928'}},'Max Iterations'),
              R('div',{style:{padding:'4px 10px',background:'#FFFFFF',border:'1px solid #D1D5DB',borderRadius:'5px',fontSize:'10px',fontWeight:800,color:'#111928',fontFamily:'JetBrains Mono,monospace'}},'20')
            ),

            // Show Progress toggle (on)
            R('div',{style:{display:'flex',alignItems:'center',gap:'10px'}},
              R('div',{style:{flex:1,fontSize:'10px',fontWeight:700,color:'#111928'}},'Show Progress'),
              R('div',{style:{width:30,height:17,borderRadius:'9px',background:'#0084FF',padding:'2px',display:'flex',justifyContent:'flex-end',alignItems:'center'}},
                R('div',{style:{width:13,height:13,borderRadius:'50%',background:'#FFFFFF',boxShadow:'0 1px 2px rgba(0,0,0,0.18)'}})
              )
            )
          )
        )
      )
    ):null
  );
}`;

/* ============================================================================
 * SUMMARY (3 lines)
 * 1. Replaces the right-side FlowHunt panel: dotted-grid agent canvas with three
 *    vertical nodes (Chat Input/AI Agent/Chat Output) plus stacked Configure
 *    Tool: MCP Client + External MCP Servers modals over them.
 * 2. Adds a 320px AI Agent right-side config sidebar with a highlighted MCP
 *    Client tool row (the visual proof the agent has the tool attached) plus
 *    LLM, Input, System Message, Max Iterations, Show Progress controls.
 * 3. Left Claude Code terminal is kept verbatim; eyebrow/title tightened to
 *    "THE SAME MCP, BOTH SIDES" / "One server. Use it locally or inside a
 *    FlowHunt agent."; Save-button pulse formula and pulseStart=200 unchanged.
 * ========================================================================== */

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
    ClaudeCodeDirectScene: { type: 'inline', code: ClaudeCodeDirectScene },
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
      scene('s01-pivot',       F.pivot,     'PivotScene'),
      scene('s02-explainer',   F.snapshot,  'SnapshotScene'),           // Project-code primer
      scene('s03-demo',        F.demo,      'DemoScene'),               // Claude Code bug-triage
      scene('s04-arch',        F.arch,      'ArchScene'),               // Architecture
      scene('s05-cc-direct',   F.ccDirect,  'ClaudeCodeDirectScene'),   // Path 3: Claude Code direct to Atlassian
      scene('s06-fh-oauth',    F.fhOAuth,   'FlowHuntOAuthScene'),      // Path 1+2 setup: Token-Auth
      scene('s07-fh-mcp',      F.fhMcp,     'FlowHuntMcpServerScene'),  // Path 2 setup: MCP Server + Connect JSON
      scene('s08-fh-bridge',   F.fhBridge,  'FlowHuntBridgeScene'),     // Path 2 wire-up: local + online
      scene('s09-fh-usage',    F.fhUsage,   'FlowHuntUsageScene'),      // Path 1 in action
      scene('s10-cta',         F.cta,       'CTAScene', { type: 'fade', duration: 26 }),
    ],
  },
};

writeFileSync(join(__dirname, 'template.json'), JSON.stringify(template, null, 2));
console.log('template.json written (' + template.composition.scenes.length + ' scenes, ' + template.output.duration + 's, ' + TOTAL_FRAMES + ' frames)');
