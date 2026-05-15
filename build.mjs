// Builds template.json from inline React component source below.
// Edit a scene, re-run `node build.mjs`, click Load again in the playground.

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const FPS = 30;
const F = {
  pivot:    { start: 0,    end: 90,   dur: 90  },  // 3s
  demo:     { start: 90,   end: 450,  dur: 360 },  // 12s
  arch:     { start: 450,  end: 610,  dur: 160 },  // ~5.33s (1.5x speed-up of 8s)
  install:  { start: 610,  end: 790,  dur: 180 },  // 6s
  snapshot: { start: 790,  end: 1030, dur: 240 },  // 8s
  cta:      { start: 1030, end: 1270, dur: 240 },  // 8s
};
const TOTAL_FRAMES = 1270;
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
 * SCENE 2 — Demo (360f, 12s) — terminal + animated Jira issue card
 * ========================================================================== */
const DemoScene = `function DemoScene(props){${HELPERS}
  var f=props.frame||0;
  var END=360;
  var sceneOut=easeIn(cl((f-(END-20))/20));
  var op=1-sceneOut;
  // Left terminal slides in
  var termIn=ease(cl(f/26));
  // Prompt typing
  // Real Jira use case: find unowned bugs, file a triage task.
  // (Bug triage is Jira's bread-and-butter — far more recognisable than a
  // vague "sprint summary" output.)
  var promptCmd='Find any open bug in KAN with no owner. File a triage task.';
  var typeStart=34, typeDur=46;
  var promptTyped=promptCmd.slice(0, Math.floor(cl((f-typeStart)/typeDur)*promptCmd.length));
  var caretOn=f>=typeStart && (Math.floor((f-typeStart)/8))%2===0 && f<typeStart+typeDur+30;
  function lineAt(d){return ease(cl((f-d)/9));}
  // Tool 1: getVisibleJiraProjects
  var t1Call=lineAt(84), t1Res=lineAt(100);
  // Tool 2: searchJiraIssuesUsingJql
  var t2Call=lineAt(128), t2Jql=lineAt(142), t2Res=lineAt(160);
  // Tool 3: createJiraIssue
  var t3Call=lineAt(190), t3Fields=lineAt(206), t3Done=lineAt(230), t3Url=lineAt(244);
  // Right pane: Jira issue card morph
  var cardIn=ease(cl((f-80)/24));
  var k3In=ease(cl((f-140)/20));
  var morphP=easeInOut(cl((f-240)/40));   // search-result card → new sprint-summary card
  var k4Fade=ease(cl((f-280)/20));
  // KAN-3 / KAN-4 explainer pills — both sit in the mid-bottom of the
  // terminal, both styled the same way (dark plate + yellow mono key).
  // They fade in as each key first appears on screen and stay until scene-out.
  var ann1=ease(cl((f-160)/22));   // KAN-3 explainer (after JQL returns)
  var ann2=ease(cl((f-270)/22));   // KAN-4 explainer (after create succeeds)

  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op,overflow:'hidden'}},

    // LEFT — Claude Code terminal
    R('div',{style:{position:'absolute',left:'40px',top:'40px',width:'900px',height:'920px',background:'#0F172A',borderRadius:'10px',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',overflow:'hidden',opacity:termIn,transform:'translateX('+(-30*(1-termIn))+'px)'}},
      R('div',{style:{height:'36px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 12px',gap:'10px'}},
        R('div',{style:{width:11,height:11,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:11,height:11,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:11,height:11,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'14px',fontSize:'12px',color:'#94A3B8',fontFamily:'JetBrains Mono,monospace'}},'claude  ·  atlassian MCP')
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
        t1Res>0.01?R('div',{style:{opacity:t1Res,color:'#94A3B8'}},'  ⎿  2 projects · picked ',R('span',{style:{color:'#22D3EE',fontWeight:700}},'KAN')):null,
        // tool 2
        t2Call>0.01?R('div',{style:{marginTop:14,opacity:t2Call}},
          R('span',{style:{color:'#94A3B8'}},'⏺ '),
          R('span',{style:{color:'#0084FF',fontWeight:700}},'atlassian'),
          R('span',{style:{color:'#94A3B8'}},'('),
          R('span',{style:{color:'#FBBF24'}},'searchJiraIssuesUsingJql'),
          R('span',{style:{color:'#94A3B8'}},')')
        ):null,
        t2Jql>0.01?R('div',{style:{opacity:t2Jql,color:'#E2E8F0',marginLeft:'24px'}},'project = ',R('span',{style:{color:'#22D3EE'}},'KAN'),' AND type = ',R('span',{style:{color:'#FBBF24'}},'Bug'),' AND assignee is ',R('span',{style:{color:'#FBBF24'}},'EMPTY')):null,
        t2Res>0.01?R('div',{style:{opacity:t2Res,color:'#94A3B8'}},'  ⎿  1 bug · ',R('span',{style:{color:'#22D3EE'}},'KAN-3'),' Login form rejects valid emails'):null,
        // tool 3
        t3Call>0.01?R('div',{style:{marginTop:14,opacity:t3Call}},
          R('span',{style:{color:'#94A3B8'}},'⏺ '),
          R('span',{style:{color:'#0084FF',fontWeight:700}},'atlassian'),
          R('span',{style:{color:'#94A3B8'}},'('),
          R('span',{style:{color:'#FBBF24'}},'createJiraIssue'),
          R('span',{style:{color:'#94A3B8'}},')')
        ):null,
        t3Fields>0.01?R('div',{style:{opacity:t3Fields,color:'#E2E8F0',marginLeft:'24px'}},
          R('div',null,'project: ',R('span',{style:{color:'#22D3EE'}},'KAN'),' · type: ',R('span',{style:{color:'#22D3EE'}},'Task')),
          R('div',null,'summary: ',R('span',{style:{color:'#FBBF24'}},'"Triage: unowned bug in KAN"')),
          R('div',null,'links: blocks ',R('span',{style:{color:'#22D3EE'}},'KAN-3'))
        ):null,
        t3Done>0.01?R('div',{style:{opacity:t3Done,color:'#22C55E',marginTop:8}},'  ⎿  ✓ ',R('span',{style:{fontWeight:700}},'KAN-4'),' Triage: unowned bug in KAN'):null,
        t3Url>0.01?R('div',{style:{opacity:t3Url,marginLeft:'24px',color:'#22D3EE',textDecoration:'underline'}},'flowhunt.atlassian.net/browse/KAN-4'):null
      )
    ),

    // RIGHT — Jira issue card preview
    cardIn>0.005?R('div',{style:{position:'absolute',right:'40px',top:'40px',width:'900px',height:'920px',background:'#FFFFFF',borderRadius:'10px',boxShadow:'0 24px 50px rgba(17,25,40,0.10)',overflow:'hidden',opacity:cardIn}},
      // Jira chrome
      R('div',{style:{height:'46px',background:'#F4F5F7',borderBottom:'1px solid #DFE1E6',display:'flex',alignItems:'center',padding:'0 18px',gap:'10px'}},
        R('div',{style:{width:24,height:24,borderRadius:'4px',background:'#0052CC',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontSize:'14px',fontWeight:800}},'J'),
        R('div',{style:{fontSize:'13px',color:'#42526E'}},'flowhunt.atlassian.net / projects / KAN')
      ),
      // Pre-morph state: KAN-3 search result card (the open, unowned bug)
      morphP<0.95?R('div',{style:{padding:'40px 50px',opacity:1-morphP}},
        R('div',{style:{fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'SEARCH RESULTS · type = Bug · assignee is EMPTY'),
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
        R('div',{style:{marginTop:'14px',fontSize:'32px',fontWeight:800,color:'#172B4D',opacity:k4Fade}},'Triage: unowned bug in KAN'),
        R('div',{style:{marginTop:'10px',display:'flex',gap:'10px'}},
          R('div',{style:{padding:'3px 10px',background:'#EAECF0',color:'#42526E',fontSize:'11px',fontWeight:700,borderRadius:'3px'}},'TO DO')
        ),
        R('div',{style:{marginTop:'30px',fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'BLOCKS'),
        R('div',{style:{height:'1px',background:'#DFE1E6',marginTop:'8px'}}),
        R('div',{style:{marginTop:'16px',padding:'12px 14px',background:'#FAFBFC',border:'1px solid #DFE1E6',borderRadius:'6px',display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{width:'22px',height:'22px',background:'#DE350B',borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontSize:'12px'}},'!'),
          R('span',{style:{color:'#0052CC',fontWeight:700,fontFamily:'JetBrains Mono,monospace',fontSize:'14px'}},'KAN-3'),
          R('span',{style:{fontSize:'15px',color:'#172B4D'}},'Login form rejects valid emails'),
          R('span',{style:{marginLeft:'auto',fontSize:'12px',color:'#6B778C'}},'Open · Unassigned')
        ),
        R('div',{style:{marginTop:'22px',fontSize:'12px',color:'#5E6C84',fontWeight:700,letterSpacing:'0.04em'}},'DESCRIPTION'),
        R('div',{style:{height:'1px',background:'#DFE1E6',marginTop:'8px'}}),
        R('div',{style:{marginTop:'14px',fontSize:'15px',color:'#42526E',lineHeight:1.55}},'Assign an owner by EOD. Reproduce on Firefox + Safari. Add a fix-by date.')
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
      R('span',null,'the bug Jira returned')
    ):null,
    ann2>0.005?R('div',{style:{position:'absolute',left:'490px',top:'825px',transform:'translateX(-50%) translateY('+(8*(1-ann2))+'px)',opacity:ann2,background:'#111928',color:'#FFFFFF',padding:'12px 22px',borderRadius:'10px',fontSize:'17px',fontWeight:600,whiteSpace:'nowrap',boxShadow:'0 12px 28px rgba(0,0,0,0.40)',zIndex:10,display:'flex',alignItems:'center',gap:'12px'}},
      R('span',{style:{color:'#FBBF24',fontFamily:'JetBrains Mono,monospace',fontWeight:800}},'KAN-4'),
      R('span',{style:{color:'#94A3B8'}},'—'),
      R('span',null,'the triage task Claude filed')
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
const InstallScene = `function InstallScene(props){${HELPERS}
  var f=props.frame||0;
  var END=180;
  var op=ease(cl(f/20))-easeIn(cl((f-(END-20))/20));
  var termIn=ease(cl(f/20));
  var promptCmd='claude mcp add --transport http atlassian https://mcp.atlassian.com/v1/mcp/authv2';
  var typeStart=24, typeDur=60;
  var promptTyped=promptCmd.slice(0, Math.floor(cl((f-typeStart)/typeDur)*promptCmd.length));
  var caretOn=f>=typeStart && (Math.floor((f-typeStart)/8))%2===0 && f<typeStart+typeDur+30;
  var resultP=ease(cl((f-86)/16));
  var oauthIn=ease(cl((f-120)/22));
  var acceptPulse=0.5+0.5*Math.sin((f-150)*0.22);
  // syntax-colour the command into spans
  function span(t,c){return R('span',{style:{color:c}},t);}
  return R('div',{style:{width:'100%',height:'100%',background:'#F3F4F6',fontFamily:'Inter,system-ui,sans-serif',position:'relative',opacity:op}},
    // Title
    R('div',{style:{position:'absolute',left:'50%',top:'160px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'INSTALL'),
    R('div',{style:{position:'absolute',left:'50%',top:'200px',transform:'translateX(-50%)',fontSize:'32px',fontWeight:800,color:'#111928'}},'One command. One OAuth click.'),

    // Terminal
    R('div',{style:{position:'absolute',left:'50%',top:'320px',transform:'translateX(-50%)',width:'1400px',background:'#0F172A',borderRadius:'12px',overflow:'hidden',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',opacity:termIn,transform:'translateX(-50%) translateY('+(15*(1-termIn))+'px)'}},
      R('div',{style:{height:'40px',background:'#1E293B',display:'flex',alignItems:'center',padding:'0 14px',gap:'10px'}},
        R('div',{style:{width:11,height:11,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:11,height:11,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:11,height:11,borderRadius:'50%',background:'#28C840'}})
      ),
      R('div',{style:{padding:'40px 40px',fontFamily:'JetBrains Mono,monospace',fontSize:'22px',lineHeight:1.55,color:'#E2E8F0'}},
        R('div',null,
          span('$ ', '#22C55E'),
          R('span',null, promptTyped),
          caretOn?R('span',{style:{display:'inline-block',width:11,height:22,background:'#E2E8F0',marginLeft:2,verticalAlign:'middle'}}):null
        ),
        resultP>0.01?R('div',{style:{marginTop:24,opacity:resultP,color:'#22C55E'}},'✓ Added MCP server "atlassian" (http, OAuth 2.1)'):null
      )
    ),

    // OAuth flash card bottom-right
    oauthIn>0.005?R('div',{style:{position:'absolute',right:'80px',bottom:'120px',width:'520px',background:'#FFFFFF',borderRadius:'12px',boxShadow:'0 24px 50px rgba(17,25,40,0.20)',overflow:'hidden',opacity:oauthIn,transform:'translateY('+(20*(1-oauthIn))+'px)'}},
      R('div',{style:{height:'34px',background:'#E8EAF0',display:'flex',alignItems:'center',padding:'0 12px',gap:'8px'}},
        R('div',{style:{width:9,height:9,borderRadius:'50%',background:'#FF5F57'}}),
        R('div',{style:{width:9,height:9,borderRadius:'50%',background:'#FEBC2E'}}),
        R('div',{style:{width:9,height:9,borderRadius:'50%',background:'#28C840'}}),
        R('div',{style:{marginLeft:'10px',padding:'3px 10px',background:'#FFFFFF',borderRadius:'4px',fontSize:'10px',color:'#6B7280'}},'atlassian.com / o / authorize')
      ),
      R('div',{style:{padding:'22px 24px'}},
        R('div',{style:{fontSize:'13px',fontWeight:700,color:'#111928',marginBottom:'12px'}},'Claude Code is requesting access'),
        R('div',{style:{marginBottom:'8px',padding:'10px 14px',background:'#F3F4F6',borderRadius:'6px',fontSize:'13px',color:'#111928'}},'✓  Read'),
        R('div',{style:{marginBottom:'8px',padding:'10px 14px',background:'#F3F4F6',borderRadius:'6px',fontSize:'13px',color:'#111928'}},'✓  Search'),
        R('div',{style:{marginBottom:'14px',padding:'10px 14px',background:'#F3F4F6',borderRadius:'6px',fontSize:'13px',color:'#111928'}},'✓  Write'),
        R('div',{style:{display:'flex',justifyContent:'flex-end',gap:'8px'}},
          R('div',{style:{padding:'7px 16px',fontSize:'12px',fontWeight:600,color:'#6B7280'}},'Cancel'),
          R('div',{style:{padding:'7px 20px',fontSize:'12px',fontWeight:700,color:'#FFFFFF',background:'#0052CC',borderRadius:'4px',boxShadow:'0 0 0 '+(4+8*acceptPulse)+'px rgba(0,82,204,0.18)'}},'Accept')
        )
      )
    ):null
  );
}`;

/* ============================================================================
 * SCENE 5 — Snapshot magic (240f, 8s) — query JSON → real Jira issue
 * ========================================================================== */
/* ============================================================================
 * SCENE 5 — "Your Jira, mapped" (240f, 8s)
 * Explains what KAN is (project key), what KAN-3 / KAN-4 are (issue keys),
 * and shows the broader tool surface so viewers see the demo is one of many
 * shapes the Atlassian MCP supports. Not a repeat of Scene 2's snapshot.
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
    R('div',{style:{position:'absolute',left:'50%',top:'66px',transform:'translateX(-50%)',fontSize:'14px',fontWeight:700,color:'#6B7280',letterSpacing:'2px'}},'KAN, EXPLAINED'),
    R('div',{style:{position:'absolute',left:'50%',top:'104px',transform:'translateX(-50%)',fontSize:'42px',fontWeight:800,color:'#111928',letterSpacing:'-0.5px'}},'What is a KAN?'),
    R('div',{style:{position:'absolute',left:'50%',top:'162px',transform:'translateX(-50%)',fontSize:'22px',color:'#6B7280',fontWeight:500}},'Your Jira project key, and the issue keys that live inside it.'),

    // ─── LEFT (60%): the hierarchy tree ───
    R('div',{style:{position:'absolute',left:'80px',top:'230px',width:'1050px'}},
      // Site row
      R('div',{style:{opacity:siteIn,transform:'translateY('+(10*(1-siteIn))+'px)',display:'flex',alignItems:'center',gap:'14px',padding:'10px 14px',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'12px'}},
        R('div',{style:{width:36,height:36,borderRadius:'8px',background:'#0052CC',display:'flex',alignItems:'center',justifyContent:'center',color:'#FFFFFF',fontWeight:800,fontFamily:'JetBrains Mono,monospace',fontSize:'14px'}},'A'),
        R('div',null,
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:700,letterSpacing:'0.06em'}},'SITE'),
          R('div',{style:{fontSize:'18px',color:'#111928',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'flowhunt.atlassian.net')
        )
      ),
      // Project row
      R('div',{style:{marginTop:'14px',marginLeft:'34px',opacity:projIn,transform:'translateX('+((1-projIn)*-14)+'px)',display:'flex',alignItems:'center',gap:'14px',padding:'14px 18px',background:'linear-gradient(90deg,rgba(0,132,255,0.08),rgba(26,86,219,0.04))',border:'1.5px solid #0084FF',borderRadius:'12px'}},
        R('div',{style:{padding:'6px 14px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'20px',fontWeight:800,borderRadius:'8px'}},'KAN'),
        R('div',{style:{flex:1}},
          R('div',{style:{fontSize:'12px',color:'#6B7280',fontWeight:700,letterSpacing:'0.06em'}},'PROJECT KEY'),
          R('div',{style:{fontSize:'18px',color:'#111928',fontWeight:700}},'Kanban demo board')
        ),
        R('div',{style:{fontSize:'13px',color:'#6B7280',fontWeight:600}}, '4 issues')
      ),
      // Issues — nested
      R('div',{style:{marginTop:'4px',marginLeft:'68px'}},
        row({prog:i1In,key:'KAN-1',summary:'Spike: evaluate options'}),
        row({prog:i2In,key:'KAN-2',summary:'Refactor auth flow'}),
        row({prog:i3In,key:'KAN-3',summary:'Login form rejects valid emails',tag:'JQL match',tagColor:'#10B981'}),
        row({prog:i4In,key:'KAN-4',summary:'Triage: unowned bug in KAN',tag:'Claude created',tagColor:'#0084FF'})
      )
    ),

    // ─── RIGHT (40%): the legend panel ───
    R('div',{style:{position:'absolute',right:'80px',top:'230px',width:'620px'}},
      // Legend card 1 — project key
      R('div',{style:{opacity:l1,transform:'translateY('+(10*(1-l1))+'px)',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'14px',padding:'22px 24px',boxShadow:'0 8px 22px rgba(17,25,40,0.05)'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{padding:'4px 12px',background:'linear-gradient(135deg,#0084FF,#1A56DB)',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'18px',fontWeight:800,borderRadius:'6px'}},'KAN'),
          R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'= the project key')
        ),
        R('div',{style:{marginTop:'10px',fontSize:'16px',color:'#6B7280',lineHeight:1.5}},'Three or four letters Jira gives every project. Yours might be ENG, OPS, DATA — same idea.')
      ),
      // Legend card 2 — issue keys
      R('div',{style:{marginTop:'18px',opacity:l2,transform:'translateY('+(10*(1-l2))+'px)',background:'#FFFFFF',border:'1px solid #E5E7EB',borderRadius:'14px',padding:'22px 24px',boxShadow:'0 8px 22px rgba(17,25,40,0.05)'}},
        R('div',{style:{display:'flex',alignItems:'center',gap:'12px'}},
          R('div',{style:{padding:'4px 12px',background:'#0052CC',color:'#FFFFFF',fontFamily:'JetBrains Mono,monospace',fontSize:'18px',fontWeight:800,borderRadius:'6px'}},'KAN-N'),
          R('div',{style:{fontSize:'20px',fontWeight:700,color:'#111928'}},'= an issue key')
        ),
        R('div',{style:{marginTop:'10px',fontSize:'16px',color:'#6B7280',lineHeight:1.5}},'Every ticket gets the project key plus a number. ',
          R('span',{style:{color:'#10B981',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'KAN-3'),
          ' is what JQL found. ',
          R('span',{style:{color:'#0084FF',fontWeight:700,fontFamily:'JetBrains Mono,monospace'}},'KAN-4'),
          ' is what Claude just filed.'
        )
      )
    ),

    // ─── BOTTOM ribbon: tool categories the Atlassian MCP exposes ───
    rib>0.005?R('div',{style:{position:'absolute',left:'80px',right:'80px',bottom:'120px',opacity:rib,transform:'translateY('+(10*(1-rib))+'px)'}},
      R('div',{style:{fontSize:'13px',color:'#6B7280',fontWeight:700,letterSpacing:'0.08em',textAlign:'center',marginBottom:'14px'}},'AND THE SAME KEY UNLOCKS EVERYTHING ELSE'),
      R('div',{style:{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'nowrap'}},
        [{p:c1,t:'Search issues'},{p:c2,t:'Create / update'},{p:c3,t:'Transitions'},{p:c4,t:'Comments'},{p:c5,t:'Sprints'},{p:c6,t:'Confluence pages'}].map(function(o,i){
          return R('div',{key:i,style:{opacity:o.p,transform:'translateY('+(8*(1-o.p))+'px) scale('+(0.9+0.1*o.p)+')',padding:'12px 22px',background:'#FFFFFF',border:'1.5px solid #E5E7EB',borderRadius:'999px',fontSize:'17px',fontWeight:700,color:'#111928',whiteSpace:'nowrap',boxShadow:'0 4px 12px rgba(17,25,40,0.05)'}}, o.t);
        })
      )
    ):null,

    // ─── Bottom-centre narrator pill ───
    pillP>0.005?R('div',{style:{position:'absolute',left:'50%',bottom:'46px',transform:'translateX(-50%) translateY('+(8*(1-pillP))+'px)',opacity:pillP,background:'#111928',color:'#FFFFFF',borderRadius:'999px',padding:'12px 28px',fontSize:'20px',fontWeight:700,boxShadow:'0 8px 22px rgba(17,25,40,0.20)',whiteSpace:'nowrap',zIndex:10}}, 'Learn the key. Use the whole product.'):null
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
    PivotScene:    { type: 'inline', code: PivotScene },
    DemoScene:     { type: 'inline', code: DemoScene },
    ArchScene:     { type: 'inline', code: ArchScene },
    InstallScene:  { type: 'inline', code: InstallScene },
    SnapshotScene: { type: 'inline', code: SnapshotScene },
    CTAScene:      { type: 'inline', code: CTAScene },
    Watermark:     { type: 'inline', code: Watermark },
  },
  inputs: [],
  composition: {
    scenes: [
      scene('s1-pivot',    F.pivot,    'PivotScene'),
      scene('s2-demo',     F.demo,     'DemoScene'),
      scene('s3-arch',     F.arch,     'ArchScene'),
      scene('s4-install',  F.install,  'InstallScene'),
      scene('s5-snapshot', F.snapshot, 'SnapshotScene'),
      scene('s6-cta',      F.cta,      'CTAScene', { type: 'fade', duration: 26 }),
    ],
  },
};

writeFileSync(join(__dirname, 'template.json'), JSON.stringify(template, null, 2));
console.log('template.json written (' + template.composition.scenes.length + ' scenes, ' + template.output.duration + 's, ' + TOTAL_FRAMES + ' frames)');
