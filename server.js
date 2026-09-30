import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'server-data');
const dataFile = path.join(dataDir, 'data.json');
const seed = {
  schemaVersion: 4,
  audit: [], activities: [], issues: [], polls: [], tickets: [], schedules: [], communityPosts: [], questionPapers: [], questionAttempts: [], workflows: {}, mentorship: [], mentorChats: [], vivaAttempts: [], mockTests: [], studentFeatureState: {},
  notificationOutbox: [], webhookConfigs: [], studentTools: {},
  onlineClasses: [], onlineSessions: [], classRoster: [], attendanceRegisters: [],
  users: {
    Student:{id:'CSE26-001',name:'Satya Prakash',role:'Student',subtitle:'Student • CSE (IoT) • Sem 1'},
    Faculty:{id:'FAC-CSE-DK',name:'Dhirendra Kumar',role:'Faculty',subtitle:'Assistant Professor • CSE',department:'Computer Science & Engineering',subjects:['Introduction to AI','Programming for Problem Solving (PPS)']},
    CR:{id:'CR-CSE-01',name:'Satya Prakash',role:'CR',subtitle:'Class Representative'}
  },
  facultyDirectory:[
    {id:'FAC-CSE-DK',name:'Dhirendra Kumar',department:'Computer Science & Engineering',designation:'Assistant Professor',subjects:['Introduction to AI','Programming for Problem Solving (PPS)'],short:'DK'},
    {id:'FAC-AH-AKJ',name:'Anand Kumar Jha',department:'Applied Science & Humanities',designation:'Assistant Professor',subjects:['Engineering Mathematics-I'],short:'AKJ'},
    {id:'FAC-AH-AK',name:'Anand Kamal',department:'Computer Science & Engineering',designation:'Assistant Professor',subjects:[],short:'AK'},
    {id:'FAC-AH-AVJ',name:'Avinash Kumar Jha',department:'Applied Science & Humanities',designation:'Assistant Professor',subjects:['Engineering Physics'],short:'AKJ'},
    {id:'FAC-EE-PK',name:'Poonam Kumari',department:'Electrical Engineering',designation:'Assistant Professor',subjects:['Basic Electrical & Electronics Engineering (BEEE)'],short:'PK'},
    {id:'FAC-AH-RKJ',name:'Rajeev Kumar Jha',department:'Applied Science & Humanities',designation:'Faculty',subjects:['Universal Human Values'],short:'RKJ'},
    {id:'FAC-AH-CKJ',name:'Chandan Kumar Jha',department:'Applied Science & Humanities',designation:'Assistant Professor • Chemistry',subjects:[],short:'CKJ'},
    {id:'FAC-CE-SK',name:'Sumit Kumar',department:'Civil Engineering',designation:'Assistant Professor',subjects:[],short:'SK'}
  ],
  studentRecords:{studentId:'CSE26-001',name:'Satya Prakash',programme:'B.Tech Computer Science & Engineering (IoT)',semester:'Semester I',session:'2026-27',college:'Government Engineering College Madhubani',university:'Bihar Engineering University, Patna',enrollmentStatus:'Active',attendance:{total:62,present:54}},
  certificates:[{id:'CERT-001',title:'Induction / Orientation Participation',status:'Available',issuedOn:'2026-08-10'}],
  syllabus:[
    {name:'Engineering Mathematics-I',code:'MAT-I',credits:3,faculty:'Anand Kumar Jha',status:'College faculty mapping',units:['Differential calculus and applications','Integral calculus and applications','Matrices and linear algebra','Differential equations','Vector calculus / multivariable calculus']},
    {name:'Engineering Physics',code:'PHY-I',credits:3,faculty:'Avinash Kumar Jha',status:'College faculty mapping',units:['Quantum physics and matter waves','Wave optics and interference','Lasers and optical fibre','Electromagnetism and magnetic materials','Modern engineering physics applications']},
    {name:'Introduction to AI',code:'AI-I',credits:3,faculty:'Dhirendra Kumar',status:'College faculty mapping; BEU syllabus portal reference',units:['AI foundations and intelligent agents','Problem solving and search','Knowledge representation','Machine learning foundations','Applications and responsible AI']},
    {name:'Programming for Problem Solving (PPS)',code:'PPS-I',credits:3,faculty:'Dhirendra Kumar',status:'College faculty mapping',units:['Algorithms, flowcharts and C basics','Operators, control flow and functions','Arrays, strings and pointers','Structures, unions and dynamic memory','File handling and problem-solving practice']},
    {name:'Basic Electrical & Electronics Engineering (BEEE)',code:'BEEE-I',credits:3,faculty:'Poonam Kumari',status:'College faculty mapping; BEU syllabus portal reference',units:['DC circuits and network laws','AC fundamentals and power','Electrical machines and transformers','Semiconductor devices and rectifiers','Digital/electronic fundamentals']},
    {name:'Universal Human Values',code:'UHV-I',credits:2,faculty:'Rajeev Kumar Jha',status:'College faculty mapping; BEU syllabus portal reference',units:['Self-exploration and basic human aspirations','Harmony in the self and body','Harmony in family and society','Harmony in nature/existence','Professional ethics and human values']}
  ],
  beu2026Curriculum:[
    {name:'Engineering Mathematics-I',credits:3,source:'BEU 2026 curriculum portal'},
    {name:'Engineering Physics',credits:3,source:'BEU 2026 curriculum portal'},
    {name:'Introduction to AI',credits:3,source:'BEU 2026 curriculum portal'},
    {name:'Computer Fundamentals & Emerging Technology',credits:3,source:'BEU 2026 curriculum portal'},
    {name:'Universal Human Values',credits:2,source:'BEU 2026 curriculum portal'},
    {name:'Essence of Indian Constitution',credits:2,source:'BEU 2026 curriculum portal'},
    {name:'Basic Electrical & Electronics Engineering (BEEE)',credits:3,source:'BEU 2026 curriculum portal'}
  ],
  announcements:[
    {id:1,title:'End-Sem Exam Schedule Released',body:'Check dates and syllabus.',role:'Faculty',createdAt:'2026-09-20T09:00:00.000Z'},
    {id:2,title:'Lab Manual Updated',body:'For all first year students.',role:'Faculty',createdAt:'2026-09-18T09:00:00.000Z'},
    {id:3,title:'AI/ML Workshop',body:'Registration open now!',role:'CR',createdAt:'2026-09-16T09:00:00.000Z'}
  ],
  assignments:[
    {id:1,title:'AI Fundamentals — Assignment 01',subject:'Introduction to AI',deadline:'2026-09-25',status:'Pending',submittedBy:[],submissions:[]},
    {id:2,title:'C Programming — Problem Set 01',subject:'Programming for Problem Solving (PPS)',deadline:'2026-09-27',status:'Pending',submittedBy:[],submissions:[]},
    {id:3,title:'Engineering Physics — Unit 1 Practice',subject:'Engineering Physics',deadline:'2026-09-29',status:'Upcoming',submittedBy:[],submissions:[]},
    {id:4,title:'BEEE — Basic Circuit Analysis',subject:'Basic Electrical & Electronics Engineering',deadline:'2026-10-01',status:'Upcoming',submittedBy:[],submissions:[]},
    {id:5,title:'Mathematics-I — Problem Set',subject:'Engineering Mathematics-I',deadline:'2026-10-03',status:'Upcoming',submittedBy:[],submissions:[]},
    {id:6,title:'UHV Reflection Activity',subject:'Universal Human Values',deadline:'2026-10-06',status:'Upcoming',submittedBy:[],submissions:[]}
  ],
  resources:[
    {id:1,title:'Introduction to AI — Unit 1 Notes',type:'Notes',subject:'Introduction to AI',size:'2.4 MB',content:'AI foundations, intelligent agents, problem solving and search concepts.'},
    {id:2,title:'PPS — C Programming Practice Set',type:'PYQ',subject:'Programming for Problem Solving (PPS)',size:'1.1 MB',content:'Problem solving, algorithms, C fundamentals, control flow and functions.'},
    {id:3,title:'Engineering Physics — Revision PPT',type:'PPT',subject:'Engineering Physics',size:'3.8 MB',content:'Semester I physics revision material and key derivations.'},
    {id:4,title:'BEEE — Circuit Fundamentals Lecture',type:'Lecture',subject:'Basic Electrical & Electronics Engineering',size:'Video',content:'Basic electrical circuits, circuit laws and introductory electrical concepts.'},
    {id:5,title:'Mathematics-I — Important Questions',type:'PYQ',subject:'Engineering Mathematics-I',size:'1.6 MB',content:'Semester I mathematics practice and exam-oriented questions.'},
    {id:6,title:'UHV — Value Education Notes',type:'Notes',subject:'Universal Human Values',size:'1.2 MB',content:'Value education, harmony and professional responsibility notes.'}
  ],
  attendance:{total:62,present:54},
  subjectsProfile:[
    {name:'Engineering Mathematics-I',code:'MAT-I',icon:'∑',color:'blue',progress:62,status:'On track',faculty:'Anand Kumar Jha'},
    {name:'Engineering Physics',code:'PHY-I',icon:'⚛',color:'yellow',progress:72,status:'Improving',faculty:'Avinash Kumar Jha'},
    {name:'Introduction to AI',code:'AI-I',icon:'✦',color:'violet',progress:68,status:'Good',faculty:'Dhirendra Kumar'},
    {name:'Programming for Problem Solving (PPS)',code:'PPS-I',icon:'</>',color:'green',progress:74,status:'Good',faculty:'Dhirendra Kumar'},
    {name:'Basic Electrical & Electronics Engineering',code:'BEEE-I',icon:'ϟ',color:'teal',progress:65,status:'Improving',faculty:'Poonam Kumari'},
    {name:'Universal Human Values',code:'UHV-I',icon:'♡',color:'pink',progress:80,status:'Strong',faculty:'Rajeev Kumar Jha'}
  ],
  exams:[
    {id:1,title:'Engineering Mathematics-I Mid-Sem',subject:'Engineering Mathematics-I',date:'2026-10-11',daysLabel:'Next exam'},
    {id:2,title:'Engineering Physics Mid-Sem',subject:'Engineering Physics',date:'2026-10-15',daysLabel:'Upcoming'},
    {id:3,title:'Introduction to AI Mid-Sem',subject:'Introduction to AI',date:'2026-10-18',daysLabel:'Upcoming'},
    {id:4,title:'PPS Practical',subject:'Programming for Problem Solving (PPS)',date:'2026-10-20',daysLabel:'Upcoming'}
  ],
  studyPlans:{'CSE26-001':[{id:1,title:'Revise Integration',minutes:25,done:true},{id:2,title:'Physics Assignment',minutes:30,done:true},{id:3,title:'Solve 5 PYQs',minutes:20,done:false},{id:4,title:'Watch AI Lecture',minutes:30,done:false}]},
  schedules:[
    {id:1,time:'09:00 AM',title:'Engineering Mathematics-I',detail:'Anand Kumar Jha • Room 201',subject:'Engineering Mathematics-I',faculty:'Anand Kumar Jha'},
    {id:2,time:'11:00 AM',title:'Engineering Physics',detail:'Avinash Kumar Jha • Room 305',subject:'Engineering Physics',faculty:'Avinash Kumar Jha'},
    {id:3,time:'01:00 PM',title:'Introduction to AI',detail:'Dhirendra Kumar • CSE Lab 1',subject:'Introduction to AI',faculty:'Dhirendra Kumar'},
    {id:4,time:'03:00 PM',title:'Programming for Problem Solving (PPS)',detail:'Dhirendra Kumar • CSE Lab 2',subject:'Programming for Problem Solving (PPS)',faculty:'Dhirendra Kumar'},
    {id:5,time:'04:00 PM',title:'Basic Electrical & Electronics Engineering',detail:'Poonam Kumari • Electrical Lab',subject:'Basic Electrical & Electronics Engineering (BEEE)',faculty:'Poonam Kumari'},
    {id:6,time:'05:00 PM',title:'Universal Human Values',detail:'Rajeev Kumar Jha • Seminar Hall',subject:'Universal Human Values',faculty:'Rajeev Kumar Jha'}
  ],
  questionBank:[
    {id:'AI-001',subject:'Introduction to AI',unit:'Unit 1',question:'Which property is essential for an intelligent agent?',options:['It must always use deep learning','It perceives its environment and acts on it','It must be connected to the internet','It can only work with images'],answer:1,explanation:'An intelligent agent perceives its environment through sensors and acts through actuators.'},
    {id:'AI-002',subject:'Introduction to AI',unit:'Unit 1',question:'Which search strategy expands the shallowest unexpanded node first?',options:['Depth-first search','Breadth-first search','Hill climbing','Genetic search'],answer:1,explanation:'Breadth-first search expands nodes level by level and therefore finds the shallowest solution in an unweighted search tree.'},
    {id:'AI-003',subject:'Introduction to AI',unit:'Unit 2',question:'A heuristic function h(n) estimates what for a search problem?',options:['The exact path already travelled','The cost from the start state only','The estimated cost from n to a goal','The number of sensors'],answer:2,explanation:'A heuristic estimates the remaining cost from the current state to a goal state.'},
    {id:'AI-004',subject:'Introduction to AI',unit:'Unit 2',question:'Which technique is commonly used to represent knowledge using relationships among entities?',options:['Semantic networks','Binary search','Round-robin scheduling','Bubble sort'],answer:0,explanation:'Semantic networks represent knowledge as nodes and labelled relationships.'},
    {id:'AI-005',subject:'Introduction to AI',unit:'Unit 3',question:'What is the main purpose of supervised learning?',options:['Learn from labelled examples','Remove all training data','Avoid evaluation','Generate random labels'],answer:0,explanation:'Supervised learning learns a mapping from inputs to outputs using labelled training examples.'},
    {id:'PPS-001',subject:'Programming for Problem Solving (PPS)',unit:'Unit 1',question:'Which format specifier is used to read an integer with scanf in C?',options:['%f','%c','%d','%s'],answer:2,explanation:'%d is used for an int in scanf.'},
    {id:'PPS-002',subject:'Programming for Problem Solving (PPS)',unit:'Unit 1',question:'What is the value of 7 % 3 in C?',options:['1','2','2.33','0'],answer:0,explanation:'The remainder after integer division of 7 by 3 is 1.'},
    {id:'PPS-003',subject:'Programming for Problem Solving (PPS)',unit:'Unit 2',question:'Which loop is guaranteed to execute its body at least once?',options:['for','while','do-while','nested for'],answer:2,explanation:'A do-while loop checks its condition after executing the loop body.'},
    {id:'PPS-004',subject:'Programming for Problem Solving (PPS)',unit:'Unit 3',question:'In C, array indexing normally starts at:',options:['-1','0','1','Depends on compiler'],answer:1,explanation:'The first element of a C array is at index 0.'},
    {id:'PPS-005',subject:'Programming for Problem Solving (PPS)',unit:'Unit 4',question:'Which operator is used to access the value stored at a pointer address?',options:['&','*','->','%'],answer:1,explanation:'The unary * operator dereferences a pointer.'},
    {id:'PHY-001',subject:'Engineering Physics',unit:'Unit 1',question:'The de Broglie wavelength of a particle is inversely proportional to its:',options:['Momentum','Charge','Volume','Temperature only'],answer:0,explanation:'de Broglie wavelength is λ = h/p.'},
    {id:'PHY-002',subject:'Engineering Physics',unit:'Unit 1',question:'Which phenomenon demonstrates the wave nature of light?',options:['Photoelectric effect only','Interference','Thermionic emission','Hall effect'],answer:1,explanation:'Interference is a characteristic wave phenomenon.'},
    {id:'PHY-003',subject:'Engineering Physics',unit:'Unit 2',question:'In a laser, stimulated emission produces photons that are:',options:['Randomly phased','Coherent with the incident photon','Always lower frequency','Always unpolarized'],answer:1,explanation:'Stimulated emission produces photons matching the incident photon in frequency, phase and direction.'},
    {id:'PHY-004',subject:'Engineering Physics',unit:'Unit 3',question:'The SI unit of magnetic flux is:',options:['Tesla','Weber','Henry','Gauss'],answer:1,explanation:'Magnetic flux is measured in weber (Wb).'},
    {id:'PHY-005',subject:'Engineering Physics',unit:'Unit 4',question:'Which principle is used in optical fibre communication?',options:['Total internal reflection','Photoelectric emission','Thermal expansion','Electrolysis'],answer:0,explanation:'Light is guided through an optical fibre mainly by total internal reflection.'},
    {id:'BEEE-001',subject:'Basic Electrical & Electronics Engineering (BEEE)',unit:'Unit 1',question:'Ohm’s law for a linear resistor is:',options:['V = IR','P = I/R','I = VR','R = VI'],answer:0,explanation:'Ohm’s law states V = IR for a linear resistive element under constant physical conditions.'},
    {id:'BEEE-002',subject:'Basic Electrical & Electronics Engineering (BEEE)',unit:'Unit 1',question:'Kirchhoff’s Current Law is based on conservation of:',options:['Energy','Charge','Momentum','Magnetic flux'],answer:1,explanation:'KCL follows conservation of electric charge at a node.'},
    {id:'BEEE-003',subject:'Basic Electrical & Electronics Engineering (BEEE)',unit:'Unit 2',question:'The RMS value of a sinusoidal voltage Vmax sin(ωt) is:',options:['Vmax','Vmax/2','Vmax/√2','√2Vmax'],answer:2,explanation:'For a sinusoid, Vrms = Vmax/√2.'},
    {id:'BEEE-004',subject:'Basic Electrical & Electronics Engineering (BEEE)',unit:'Unit 3',question:'A diode primarily allows current to flow:',options:['Equally in both directions','Preferentially in one direction','Only through an open circuit','Only at zero voltage'],answer:1,explanation:'A PN junction diode conducts strongly in forward bias and blocks ideally in reverse bias.'},
    {id:'BEEE-005',subject:'Basic Electrical & Electronics Engineering (BEEE)',unit:'Unit 4',question:'Which device is commonly used as an electronic switch and amplifier?',options:['Transformer','Transistor','Fuse','Resistor'],answer:1,explanation:'Transistors are widely used for switching and amplification.'},
    {id:'MAT-001',subject:'Engineering Mathematics-I',unit:'Unit 1',question:'If f(x)=x², then f′(x) is:',options:['x','2x','x²/2','2'],answer:1,explanation:'By the power rule, d(x²)/dx = 2x.'},
    {id:'MAT-002',subject:'Engineering Mathematics-I',unit:'Unit 1',question:'The value of ∫0¹ x dx is:',options:['1','1/2','2','0'],answer:1,explanation:'The antiderivative is x²/2, giving 1/2 at x=1 and 0 at x=0.'},
    {id:'MAT-003',subject:'Engineering Mathematics-I',unit:'Unit 2',question:'For a square matrix, a zero determinant implies that the matrix is:',options:['Orthogonal','Singular','Identity','Diagonal with all ones'],answer:1,explanation:'A square matrix is singular when its determinant is zero.'},
    {id:'MAT-004',subject:'Engineering Mathematics-I',unit:'Unit 3',question:'The eigenvalues of a matrix A are obtained from:',options:['det(A − λI)=0','det(A + I)=0','A²=0 only','trace(A)=0 only'],answer:0,explanation:'Eigenvalues satisfy the characteristic equation det(A − λI)=0.'},
    {id:'MAT-005',subject:'Engineering Mathematics-I',unit:'Unit 4',question:'The partial derivative ∂(x²y)/∂x is:',options:['2xy','x²','2x','y²'],answer:0,explanation:'Treating y as constant, ∂(x²y)/∂x = 2xy.'},
    {id:'UHV-001',subject:'Universal Human Values',unit:'Unit 1',question:'The basic aspiration common to every human being is generally described as:',options:['Continuous happiness and prosperity','Only material wealth','Competition only','Temporary pleasure only'],answer:0,explanation:'Universal Human Values discusses continuous happiness and prosperity as basic human aspirations.'},
    {id:'UHV-002',subject:'Universal Human Values',unit:'Unit 1',question:'Self-exploration in UHV primarily means:',options:['Blindly accepting instructions','Examining assumptions and proposals within oneself','Memorising definitions','Avoiding questions'],answer:1,explanation:'Self-exploration involves examining proposals through one’s own natural acceptance and experiential verification.'},
    {id:'UHV-003',subject:'Universal Human Values',unit:'Unit 2',question:'Harmony in a family is strengthened primarily by:',options:['Mutual trust and respect','Fear','Competition','Avoiding communication'],answer:0,explanation:'Trust, respect and right understanding are central to harmony in relationships.'},
    {id:'UHV-004',subject:'Universal Human Values',unit:'Unit 3',question:'A key distinction in UHV is between the needs of the:',options:['Self and body','Internet and computer','Teacher and book','College and university'],answer:0,explanation:'UHV distinguishes the needs of the self (consciousness) and the body.'},
    {id:'UHV-005',subject:'Universal Human Values',unit:'Unit 4',question:'Professional ethical conduct should be based on:',options:['Short-term gain only','Right understanding and responsibility','Copying others','Ignoring consequences'],answer:1,explanation:'Professional ethics connects competence with responsibility and right understanding.'}
  ]
};
function ensureData(){
  fs.mkdirSync(dataDir,{recursive:true});
  if(!fs.existsSync(dataFile)) fs.writeFileSync(dataFile,JSON.stringify(seed,null,2));
}
function readData(){
  ensureData();
  let d;
  try { d=JSON.parse(fs.readFileSync(dataFile,'utf8')); }
  catch { d=JSON.parse(JSON.stringify(seed)); }
  for(const k of ['audit','activities','issues','polls','tickets','schedules','communityPosts','questionPapers','questionAttempts','mentorship','mockTests','exams','subjectsProfile','facultyDirectory','syllabus','beu2026Curriculum','notificationOutbox','webhookConfigs','onlineClasses','onlineSessions','classRoster','attendanceRegisters']) if(!Array.isArray(d[k])) d[k]=JSON.parse(JSON.stringify(seed[k]||[]));
  if(!d.studentFeatureState||typeof d.studentFeatureState!=='object') d.studentFeatureState={};
  if(!d.studentRecords||typeof d.studentRecords!=='object') d.studentRecords=JSON.parse(JSON.stringify(seed.studentRecords));
  if(!Array.isArray(d.certificates)) d.certificates=JSON.parse(JSON.stringify(seed.certificates));
  if(!d.workflows||typeof d.workflows!=='object') d.workflows={};
  if(!d.studentTools||typeof d.studentTools!=='object') d.studentTools={};
  if(!Array.isArray(d.mentorChats)) d.mentorChats=[];
  if(!Array.isArray(d.vivaAttempts)) d.vivaAttempts=[];
  if(!d.studyPlans||typeof d.studyPlans!=='object') d.studyPlans=JSON.parse(JSON.stringify(seed.studyPlans));
  if(!Number.isInteger(d.schemaVersion)) d.schemaVersion=1;
  if(!Array.isArray(d.assignments)) d.assignments=JSON.parse(JSON.stringify(seed.assignments||[]));
  if(!Array.isArray(d.resources)) d.resources=JSON.parse(JSON.stringify(seed.resources||[]));
  for(const a of d.assignments){
    if(!Array.isArray(a.submissions)) a.submissions=[];
    if(!Array.isArray(a.submittedBy)) a.submittedBy=[];
    if(!a.status) a.status='Pending';
    a.locked=deadlinePassed(a.deadline);
  }
  const subjectModule={
    'Introduction to AI':['Module 1: AI Foundations','Module 2: Search & Problem Solving'],
    'Programming for Problem Solving (PPS)':['Module 1: C Fundamentals','Module 2: Control Flow & Functions'],
    'Engineering Physics':['Module 1: Quantum Physics','Module 2: Wave Optics'],
    'Basic Electrical & Electronics Engineering':['Module 1: DC Circuits','Module 2: AC Fundamentals'],
    'Engineering Mathematics-I':['Module 1: Differential Calculus','Module 2: Integral Calculus'],
    'Universal Human Values':['Module 1: Self Exploration','Module 2: Harmony in Family & Society']
  };
  for(const r of d.resources){
    if(!r.content) r.content='Resource content is available in the CampusLMS reader.';
    r.department=r.department||'Computer Science & Engineering (IoT)';
    r.semester=r.semester||'Semester I';
    r.module=r.module||(subjectModule[r.subject]?.[0]||'Module 1');
    r.path=[r.department,r.semester,r.subject||'General',r.module,r.type||'Resource'];
  }
  d.schemaVersion=4;
  return d;
}
function writeData(d){
  fs.mkdirSync(dataDir,{recursive:true});
  const tmp=`${dataFile}.${process.pid}.tmp`;
  fs.writeFileSync(tmp,JSON.stringify(d,null,2));
  fs.renameSync(tmp,dataFile);
}
function id(){return randomUUID()}
function deadlinePassed(deadline){
  if(!deadline) return false;
  const t=new Date(`${String(deadline).slice(0,10)}T23:59:59+05:30`).getTime();
  return Number.isFinite(t) && Date.now()>t;
}
function normalizeText(value=''){return String(value).toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
function textSimilarity(a='',b=''){
  const A=new Set(normalizeText(a).split(' ').filter(x=>x.length>2));
  const B=new Set(normalizeText(b).split(' ').filter(x=>x.length>2));
  if(!A.size||!B.size) return 0;
  let common=0; for(const x of A) if(B.has(x)) common++;
  return Math.round((2*common/(A.size+B.size))*100);
}
function contentHash(content=''){return createHash('sha256').update(String(content)).digest('hex');}
function safeRole(r){return ['Student','Faculty','CR'].includes(r)?r:null}
/* ===== Online Class helpers =====
   Room and join codes are generated once at schedule time and stored with the
   class, so a scheduled class always opens the same room. */
const ONLINE_DAY_TYPES=['Normal Day','Extra Class','Sunday Class'];
const ONLINE_DURATIONS=[30,45,60,90,120];
function onlineRoomId(subject=''){
  const tag=String(subject).toUpperCase().replace(/[^A-Z]/g,'').replace(/(INTRODUCTIONTOPROGRAMMINGFOR|BASIC)/g,'').slice(0,3).padEnd(3,'X');
  return `${tag}-${String(Math.floor(1000+Math.random()*9000))}`;
}
function onlineJoinCode(){
  const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out=''; for(let i=0;i<6;i++)out+=alphabet[Math.floor(Math.random()*alphabet.length)];
  return out;
}
function onlinePrettyTime(hhmm=''){
  const m=/^(\d{2}):(\d{2})$/.exec(String(hhmm)); if(!m)return String(hhmm);
  const h=Number(m[1]); const suffix=h>=12?'PM':'AM';
  const h12=h%12===0?12:h%12;
  return `${String(h12).padStart(2,'0')}:${m[2]} ${suffix}`;
}
function onlinePrettyDate(iso=''){
  const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso)); if(!m)return String(iso);
  return `${m[3]}/${m[2]}/${m[1]}`;
}
/* ===== Class roster for the attendance register =====
   The prototype always carried a 60-seat CSE (IoT) intake but no names, so the
   roster is generated once from fixed name lists and then persisted like every
   other record. Roll numbers are sequential per section and never regenerated,
   which keeps a saved register addressable later. */
const ATTENDANCE_SEMESTERS=['Semester I','Semester II','Semester III','Semester IV','Semester V','Semester VI','Semester VII','Semester VIII'];
const ATTENDANCE_BRANCHES=['CSE (IoT) — Section A','CSE (IoT) — Section B','CSE (IoT) — Section C'];
const ROSTER_FIRST=['Satya','Aarav','Vivaan','Aditya','Vihaan','Arjun','Reyansh','Krishna','Ishaan','Rudra','Kabir','Devansh','Ayaan','Yash','Karan','Rohan','Nikhil','Samar','Varun','Tanmay','Prakhar','Atharv','Dhruv','Kian'];
const ROSTER_LAST=['Prakash','Kumar','Singh','Sharma','Verma','Yadav','Patel','Reddy','Nair','Iyer','Gupta','Mehta','Joshi','Desai','Rao','Pandey','Jha','Kumari'];
function ensureRoster(d){
  if(Array.isArray(d.classRoster)&&d.classRoster.length)return d.classRoster;
  const roster=[]; let seat=1;
  for(const branch of ATTENDANCE_BRANCHES){
    for(let r=1;r<=20;r++){
      roster.push({
        rollNo:r,
        studentId:`CSE26-${String(seat).padStart(3,'0')}`,
        name:`${ROSTER_FIRST[(r-1)%ROSTER_FIRST.length]} ${ROSTER_LAST[(seat-1)%ROSTER_LAST.length]}`,
        branch,semester:'Semester I',programme:'B.Tech Computer Science & Engineering (IoT)'
      });
      seat++;
    }
  }
  /* Keep the logged-in student on roll 1 so the register agrees with the
     existing student record. */
  if(roster[0]){roster[0].studentId='CSE26-001';roster[0].name=d.studentRecords?.name||'Satya Prakash';}
  d.classRoster=roster;
  return roster;
}
function rosterFor(d,branch){
  const all=ensureRoster(d);
  return all.filter(s=>!branch||s.branch===branch);
}
function todayISODate(){
  const n=new Date();
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`;
}
function userFor(d,r,facultyId=null){if(r==='Faculty'){const f=(d.facultyDirectory||[]).find(x=>x.id===facultyId)||d.facultyDirectory?.[0]||d.users.Faculty;return {...f,id:f.id,role:'Faculty',subtitle:`${f.designation||'Faculty'} • ${f.department||'College Faculty'}`}}return d.users[r]||d.users.Student}
function audit(d,event,role='System',meta={}){d.audit.push({id:id(),event,role,meta,at:new Date().toISOString()});d.audit=d.audit.slice(-1000)}
async function dispatchNotification(d,{title,body,type='General',targetRole='Student',targetIds=[],referenceId=null}){
  const item={id:id(),title,body,type,targetRole,targetIds,referenceId,createdAt:new Date().toISOString(),deliveries:[]};
  d.notificationOutbox.unshift(item); d.notificationOutbox=d.notificationOutbox.slice(0,200);
  for(const hook of (d.webhookConfigs||[]).filter(x=>x.enabled!==false&&x.url)){
    const delivery={webhookId:hook.id,status:'queued',provider:hook.provider||'Generic',at:new Date().toISOString()};
    try{
      const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),2500);
      const payload={event:'campuslms.notification',provider:hook.provider||'Generic',notification:item};
      const r=await fetch(hook.url,{method:'POST',headers:{'Content-Type':'application/json',...(hook.secret?{'X-CampusLMS-Secret':hook.secret}:{})},body:JSON.stringify(payload),signal:controller.signal});
      clearTimeout(timer); delivery.status=r.ok?'delivered':'failed'; delivery.httpStatus=r.status;
    }catch(e){delivery.status='failed';delivery.error=e.message}
    item.deliveries.push(delivery);
  }
  return item;
}
async function queueDeadlineReminders(d){
  const now=Date.now();
  for(const a of d.assignments){
    const deadline=new Date(`${String(a.deadline).slice(0,10)}T23:59:59+05:30`).getTime();
    const hours=(deadline-now)/3600000;
    if(hours>0 && hours<=48 && !d.notificationOutbox.some(n=>n.type==='Deadline Reminder'&&String(n.referenceId)===String(a.id))){
      await dispatchNotification(d,{title:`Deadline Reminder: ${a.title}`,body:`${a.subject} is due on ${a.deadline}. Submit before the deadline lockout.`,type:'Deadline Reminder',targetRole:'Student',referenceId:a.id});
    }
  }
}
function json(res,status,payload){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET,POST,PATCH,OPTIONS'});res.end(JSON.stringify(payload))}
function body(req){return new Promise((resolve,reject)=>{let s='';req.on('data',c=>{s+=c;if(s.length>12e6)req.destroy()});req.on('end',()=>{try{resolve(s?JSON.parse(s):{})}catch(e){reject(new Error('Invalid JSON body'))}})})}
function authRole(req, fallback=null){const h=req.headers.authorization||'';if(h.startsWith('Bearer ')){try{return JSON.parse(Buffer.from(h.slice(7),'base64url').toString()).role}catch{}}return fallback}
function contains(s,words){return words.some(w=>s.includes(w))}
function aiReply(message,d,role){
  const raw=String(message||'').trim(); const q=raw.toLowerCase(); const pending=d.assignments.filter(a=>a.status==='Pending');
  const isHindi=/[\u0900-\u097F]/.test(raw);
  const langPrefix=isHindi?'हिंदी में जवाब: ':'';
  if(/summary|summarize|revision summary|सारांश|संक्षेप/.test(q)){
    const topic=raw.split(/for:|for\s|of:|का सारांश|के लिए/i).pop().trim() || 'the requested topic';
    return {reply:`${langPrefix}Revision Summary — ${topic}\n\n1. Core idea: Understand the definition and the main purpose of the topic.\n2. Key points: Learn the important terms, steps and formulas connected with it.\n3. Example: Apply the concept to one simple real-world or exam-style example.\n4. Exam focus: Remember the definition, one example, common mistakes and the most-used formula/step.\n5. Quick check: Explain the concept in your own words and solve one practice question.`,data:{type:'summary',topic}};
  }
  if(/evaluate this viva answer|viva answer|score out of 10|evaluate my answer/.test(q)){
    const answer=(raw.match(/answer:\s*(.*)/is)?.[1]||raw).trim();
    const score=answer.length>180?9:answer.length>90?8:answer.length>35?7:5;
    return {reply:`Viva feedback\n\nScore: ${score}/10\nStrengths: You attempted the question and communicated the main idea.\nCorrection: Add a clear definition, one concrete example, and the key technical distinction.\nNext step: Give the answer again in 3 parts — definition → example → conclusion.`,data:{type:'viva-feedback',score}};
  }
  if(/pending|assignment|homework/.test(q)) return {reply:`${langPrefix}You currently have ${pending.length} pending assignment${pending.length===1?'':'s'}. ${pending.slice(0,3).map(a=>`${a.title} is due ${a.deadline}`).join('; ')}.`,data:{items:pending.map(a=>`${a.title} • ${a.deadline}`)}};
  if(/30 minute|30-min|study plan|plan|अध्ययन योजना/.test(q)) return {reply:`${langPrefix}Here is a focused 30-minute plan: 10 minutes revise the core concept, 10 minutes solve 5 practice questions, and 10 minutes check mistakes. Start with Engineering Mathematics because it needs the most attention.`,data:{items:['10 min • Concept revision','10 min • 5 practice questions','10 min • Error review']}};
  if(/next|what should|recommend|क्या पढ़/.test(q)) return {reply:`${langPrefix}Your recommended next step is to complete the pending Engineering Mathematics work, then solve the Programming PYQs. I can also open the Learning Path for you.`};
  if(/resource|notes|pyq|lecture/.test(q)) return {reply:`${langPrefix}CampusLMS has ${d.resources.length} resources. I found ${d.resources.slice(0,3).map(r=>r.title).join(', ')}. Open Resources to continue.`};
  if(/exam|readiness|revision/.test(q)) return {reply:`${langPrefix}Your current demo readiness is 78%. Focus on Integration, then use PYQs and a short mock test before the exam.`};
  if(/explain|teach|doubt|normalization|recursion|deadlock/.test(q)) return {reply:`${langPrefix}Sure. I can explain the concept step-by-step. Start with the definition, then a simple example, then a practice question. Tell me the exact topic or paste the question for a focused explanation.`};
  if(/faculty|teacher|doubt ticket/.test(q)) return {reply:`${langPrefix}If you are stuck after trying the explanation, create a doubt ticket from AI → Faculty Help. The ticket is stored in CampusLMS for faculty follow-up.`};
  return {reply:`${langPrefix}I understood your request as: “${raw}”. I can help with assignments, resources, study plans, exams, summaries, viva practice, doubts and faculty support.`};
}
const server=http.createServer(async(req,res)=>{
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET,POST,PATCH,OPTIONS'});return res.end()}
 const url=new URL(req.url,'http://localhost:4000'); const d=readData();
 try{
  if(req.method==='GET'&&url.pathname==='/api/health') return json(res,200,{ok:true,service:'CampusLMS API',version:'2.0',time:new Date().toISOString()});
  if(req.method==='POST'&&url.pathname==='/api/auth/login'){const b=await body(req),role=safeRole(b.role);if(!role)return json(res,400,{ok:false,error:'Invalid role'});if(role==='Faculty'&&b.facultyId&&!((d.facultyDirectory||[]).some(f=>f.id===b.facultyId)))return json(res,400,{ok:false,error:'Invalid faculty account'});const u=userFor(d,role,b.facultyId||null),token=Buffer.from(JSON.stringify({role,id:u.id,iat:Date.now(),facultyId:role==='Faculty'?u.id:null})).toString('base64url');audit(d,'login',role,{userId:u.id,facultyId:role==='Faculty'?u.id:null});writeData(d);return json(res,200,{ok:true,token,user:u})}
  if(req.method==='GET'&&url.pathname==='/api/dashboard'){
    await queueDeadlineReminders(d);
    writeData(d);
    const role=safeRole(url.searchParams.get('role')||authRole(req,'Student'));
    if(!role)return json(res,400,{ok:false,error:'Invalid role'});
    const facultyId=url.searchParams.get('facultyId')||null;
    const base={user:userFor(d,role,facultyId),announcements:d.announcements.slice(-20).reverse(),assignments:d.assignments.slice(),resources:d.resources.slice(),issues:d.issues.slice(-20).reverse(),polls:d.polls.slice(-20).reverse(),tickets:d.tickets.slice(-20).reverse(),attendance:d.attendance,studyPlan:d.studyPlans['CSE26-001']||[],notifications:d.notificationOutbox.slice(0,20),onlineClasses:d.onlineClasses.filter(c=>c.status!=='completed').sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.time).localeCompare(String(b.time))),database:{schemaVersion:d.schemaVersion,assignments:d.assignments.length,resources:d.resources.length,submissions:d.assignments.reduce((n,a)=>n+(a.submissions?.length||0),0)}};
    if(role==='Faculty'){const f=userFor(d,'Faculty',facultyId);base.stats={courses:f.subjects?.length||0,students:60,pendingEvaluations:d.assignments.filter(a=>f.subjects?.includes(a.subject)&&a.status==='Submitted').length,performance:72,doubts:d.tickets.length};base.faculty=f;base.facultyDirectory=d.facultyDirectory||[]}
    if(role==='CR')base.stats={students:d.attendance.total,present:d.attendance.present,pendingSubmissions:d.assignments.filter(a=>a.status==='Pending').length,openIssues:d.issues.filter(i=>i.status!=='Resolved').length};
    if(role==='Student'){
      const subjects=d.subjectsProfile||seed.subjectsProfile;
      const exams=d.exams||seed.exams;
      const progress=Math.round(subjects.reduce((sum,s)=>sum+Number(s.progress||0),0)/Math.max(1,subjects.length));
      const pendingAssignments=d.assignments.filter(a=>a.status==='Pending');
      const now=new Date();
      const upcomingExams=exams.filter(e=>new Date(e.date+'T23:59:59')>=now);
      base.subjects=subjects;
      base.exams=upcomingExams;
      base.stats={subjects:subjects.length,pendingAssignments:pendingAssignments.length,progress,upcomingExams:upcomingExams.length,nextExam:upcomingExams[0]||null,streak:12};
    }
    return json(res,200,base)
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/subjects'){
    const subjects=d.subjectsProfile||seed.subjectsProfile;
    return json(res,200,{ok:true,subjects,count:subjects.length,updatedAt:new Date().toISOString()});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/assignments-summary'){
    const pending=d.assignments.filter(a=>a.status==='Pending');
    return json(res,200,{ok:true,pending,total:d.assignments.length,count:pending.length,updatedAt:new Date().toISOString()});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/progress'){
    const subjects=d.subjectsProfile||seed.subjectsProfile;
    const progress=Math.round(subjects.reduce((sum,s)=>sum+Number(s.progress||0),0)/Math.max(1,subjects.length));
    return json(res,200,{ok:true,progress,subjects,updatedAt:new Date().toISOString()});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/exams'){
    const now=new Date(); const exams=(d.exams||seed.exams).filter(e=>new Date(e.date+'T23:59:59')>=now);
    return json(res,200,{ok:true,exams,count:exams.length,next:exams[0]||null,updatedAt:new Date().toISOString()});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/smart-tools'){
    const profile=d.subjectsProfile||seed.subjectsProfile||[];
    const weakest=profile.reduce((a,b)=>Number(b.progress||0)<Number(a.progress||0)?b:a,profile[0]||{});
    const strongest=profile.reduce((a,b)=>Number(b.progress||0)>Number(a.progress||0)?b:a,profile[0]||{});
    const avg=Math.round(profile.reduce((sum,x)=>sum+Number(x.progress||0),0)/Math.max(1,profile.length));
    const pending=d.assignments.filter(a=>a.status==='Pending').length;
    const attendancePct=d.attendance?.total?Math.round(d.attendance.present/d.attendance.total*100):0;
    const submitted=d.assignments.filter(a=>Array.isArray(a.submittedBy)&&a.submittedBy.includes('CSE26-001')).length;
    const assignmentCompletion=d.assignments.length?Math.round(submitted/d.assignments.length*100):0;
    const mine=(d.questionAttempts||[]).filter(a=>a.studentId==='CSE26-001');
    const practiceAccuracy=mine.length?Math.round(mine.filter(a=>a.correct).length/mine.length*100):0;
    const readinessScore=Math.max(0,Math.min(100,Math.round(avg*.6+practiceAccuracy*.15+assignmentCompletion*.15+attendancePct*.1-Math.min(12,pending*2))));
    const states=d.studentTools||{};
    return json(res,200,{ok:true,twin:{weakest,strongest,profile,avg,attendancePct,assignmentCompletion,practiceAccuracy},readiness:{score:readinessScore,weakTopics:[weakest?.name||'Current weakest subject'],recommended:[`Revise ${weakest?.name||'your weakest subject'} for 25 minutes`,`Solve 5 targeted practice questions`,`Take a short mock test`]},timetable:d.schedules?.length?d.schedules:seed.schedules,mentorship:{next:{title:'Campus Mentorship • Academic & Personal Study Check-in',time:'Today, 5:00 PM',mentor:'Campus Mentor'},sessions:d.mentorship.slice().reverse()},path:{next:states['Learning Path']?.steps?.filter(Boolean).length>=4?'Completed':'Practice next'},savedTools:Object.keys(states)});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/academic-twin'){
    const profile=d.subjectsProfile||seed.subjectsProfile;
    const strongest=profile.reduce((a,b)=>Number(b.progress)>Number(a.progress)?b:a,profile[0]);
    const weakest=profile.reduce((a,b)=>Number(b.progress)<Number(a.progress)?b:a,profile[0]);
    const attendanceTotal=Number(d.attendance?.total||d.studentRecords?.attendance?.total||0);
    const attendancePresent=Number(d.attendance?.present||d.studentRecords?.attendance?.present||0);
    const attendancePct=attendanceTotal?Math.round(attendancePresent/attendanceTotal*100):0;
    const totalAssignments=d.assignments.length;
    const submittedAssignments=d.assignments.filter(a=>Array.isArray(a.submittedBy)&&a.submittedBy.includes('CSE26-001')).length;
    const assignmentCompletion=totalAssignments?Math.round(submittedAssignments/totalAssignments*100):0;
    const attempts=d.questionAttempts||[];
    const mine=attempts.filter(a=>a.studentId==='CSE26-001');
    const practiceAccuracy=mine.length?Math.round(mine.filter(a=>a.correct).length/mine.length*100):0;
    const plan=(d.studyPlans?.['CSE26-001']||[]);
    const consistency=plan.length?Math.round(plan.filter(x=>x.done).length/plan.length*100):0;
    const avg=Math.round(profile.reduce((sum,x)=>sum+Number(x.progress||0),0)/Math.max(1,profile.length));
    const risk=attendancePct<75||weakest.progress<60?'Needs attention':avg<70||assignmentCompletion<50?'Watch closely':'On track';
    const focus=[`25 min focused revision: ${weakest.name}`,`5 targeted practice questions from ${weakest.name}`,attendancePct<75?'Improve attendance to stay above 75%':'Maintain attendance consistency',assignmentCompletion<70?'Clear the next pending assignment':'Keep assignment momentum'];
    const recommendation=`Your strongest area is ${strongest.name} (${strongest.progress}%). Your next academic focus is ${weakest.name} (${weakest.progress}%).`;
    return json(res,200,{ok:true,profile,strongest,weakest,avg,attendance:{present:attendancePresent,total:attendanceTotal,percentage:attendancePct},assignmentCompletion,practiceAccuracy,consistency,risk,focusPlan:focus,recommendation});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/insights'){
    const profile=d.subjectsProfile||seed.subjectsProfile; const weakest=profile.reduce((a,b)=>b.progress<a.progress?b:a,profile[0]); const strongest=profile.reduce((a,b)=>b.progress>a.progress?b:a,profile[0]);
    return json(res,200,{ok:true,insights:[
      {id:1,type:'Focus Gap',title:`Focus on ${weakest.name}`,detail:`Current progress is ${weakest.progress}%. Complete a focused practice session and review the next unit.`,action:'Start Learning Path'},
      {id:2,type:'Strength',title:`Strongest subject: ${strongest.name}`,detail:`Current progress is ${strongest.progress}%. Keep the current practice routine.`,action:'Open Subject'},
      {id:3,type:'Next Step',title:'Finish pending assignments',detail:`There are ${d.assignments.filter(a=>a.status==='Pending').length} pending assignments in the backend.`,action:'Open Assignments'}
    ]});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/timetable'){
    const timetable=d.schedules.length?d.schedules:seed.schedules;
    return json(res,200,{ok:true,timetable});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/mentorship'){
    const twinProfile=d.subjectsProfile||seed.subjectsProfile;
    const weakest=twinProfile.reduce((a,b)=>Number(b.progress||0)<Number(a.progress||0)?b:a,twinProfile[0]||{});
    return json(res,200,{ok:true,sessions:d.mentorship.slice().reverse(),messages:d.mentorChats.filter(x=>x.studentId==='CSE26-001').slice(-30),next:{title:'Academic & Personal Study Check-in',time:'Today, 5:00 PM',mentor:'Campus Mentor'},mentorContext:{weakest:weakest.name,progress:weakest.progress,attendance:d.attendance?.present&&d.attendance?.total?Math.round(d.attendance.present/d.attendance.total*100):0,pending:d.assignments.filter(a=>a.status==='Pending').length}});
  }
  if(req.method==='POST'&&url.pathname==='/api/student-dashboard/mentorship'){
    const b=await body(req),action=b.action==='join'?'joined':'booked';
    const session={id:id(),studentId:b.studentId||'CSE26-001',title:b.title||'Academic & Personal Study Check-in',time:b.time||'Today, 5:00 PM',action,createdAt:new Date().toISOString(),status:action==='joined'?'Joined':'Booked'};
    d.mentorship.push(session);audit(d,`mentorship_${action}`,'Student',{sessionId:session.id});writeData(d);return json(res,201,{ok:true,session,message:`Mentorship session ${action} successfully.`});
  }
  if(req.method==='POST'&&url.pathname==='/api/student-dashboard/mentorship/chat'){
    const b=await body(req); const message=String(b.message||'').trim(); if(!message)return json(res,400,{ok:false,error:'Message is required'});
    const profile=d.subjectsProfile||seed.subjectsProfile; const weakest=profile.reduce((a,x)=>Number(x.progress||0)<Number(a.progress||0)?x:a,profile[0]||{});
    const attendancePct=d.attendance?.total?Math.round(d.attendance.present/d.attendance.total*100):0;
    const pending=d.assignments.filter(a=>a.status==='Pending').length;
    const q=message.toLowerCase();
    const pressure=/stress|pressure|overwhelm|overwhelmed|panic|tension|burnout|tired|scared|anxious|can't focus|cannot focus|बहुत दबाव|टेंशन|परेशान/.test(q);
    let reply='',plan=[];
    if(pressure){
      reply=`I hear you. Let's reduce the load instead of trying to finish everything at once. Your current academic focus is ${weakest.name} (${weakest.progress}%). For the next 30 minutes, choose one small target, silence notifications, study for 20 minutes, then take a 5-minute break. You do not need to solve the whole semester tonight. If this pressure feels too heavy to handle alone, please reach out to a trusted person or your college support system.`;
      plan=['Pick one topic only',`20 min focused work on ${weakest.name}`,'5 min break + water','5 min quick recall / self-check'];
    } else if(/study|plan|next|today|revision|exam|prepare/.test(q)){
      reply=`Based on your current profile, I would prioritise ${weakest.name}. You have ${pending} pending assignment(s) and ${attendancePct}% recorded attendance. Start with the weakest topic, then do a short practice set, then review mistakes.`;
      plan=[`25 min • ${weakest.name} concept revision`,'15 min • targeted questions','10 min • error review',pending?`Then clear the nearest assignment`:'Then take a mini test'];
    } else if(/career|job|future|intern|skill|placement/.test(q)){
      reply=`For a CSE (IoT) first-semester student, build fundamentals first: programming, problem solving, mathematics and communication. Keep one small technical habit every day instead of chasing many tools at once. Your current PPS and AI progress gives you a useful base to build on.`;
      plan=['Daily PPS/problem-solving practice','One small AI/IoT concept each week','Keep mathematics fundamentals active','Build one small project after fundamentals'];
    } else {
      reply=`I'm your Campus Mentor. I can help you with study planning, weak subjects, assignments, exam preparation, career direction or when you're feeling overloaded. Right now, ${weakest.name} is your weakest tracked subject at ${weakest.progress}%, so we can start there.`;
      plan=[`Ask me about ${weakest.name}`,'Ask for a 30-minute study plan','Ask about exam preparation','Tell me what is causing difficulty'];
    }
    const item={id:id(),studentId:b.studentId||'CSE26-001',role:'mentor',message,reply,plan,pressure,createdAt:new Date().toISOString()};
    d.mentorChats.push(item); audit(d,'mentorship_chat','Student',{message,pressure}); writeData(d);
    return json(res,200,{ok:true,reply,plan,pressure,createdAt:item.createdAt});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/mentorship/history'){
    return json(res,200,{ok:true,messages:d.mentorChats.filter(x=>x.studentId==='CSE26-001').slice(-50)});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/viva/questions'){
    const subjects=['Introduction to AI','Programming for Problem Solving (PPS)','Engineering Physics','Basic Electrical & Electronics Engineering (BEEE)','Engineering Mathematics-I','Universal Human Values'];
    const subject=String(url.searchParams.get('subject')||'Programming for Problem Solving (PPS)');
    const bank=(d.questionBank||[]).filter(q=>q.subject===subject).slice(0,8).map(q=>({id:q.id,subject:q.subject,unit:q.unit,question:q.question}));
    const fallback=[{id:'VIVA-1',subject,unit:'Core',question:`Explain one important concept from ${subject} and give a practical example.`}];
    return json(res,200,{ok:true,subject,subjects,questions:bank.length?bank:fallback});
  }
  if(req.method==='POST'&&url.pathname==='/api/student-dashboard/viva/evaluate'){
    const b=await body(req),question=String(b.question||''),answer=String(b.answer||'').trim(); if(!question||!answer)return json(res,400,{ok:false,error:'Question and answer are required'});
    const words=answer.toLowerCase().split(/\W+/).filter(Boolean); const unique=new Set(words);
    const score=Math.max(4,Math.min(10,Math.round(4+(unique.size>=12?3:unique.size>=7?2:1)+(answer.length>120?2:answer.length>60?1:0))));
    const feedback=answer.length<45?'Good attempt, but add a definition, one example and one key technical point.':answer.length<100?'Good structure. Add one concrete example and explain the key reason behind your answer.':'Strong explanation. Tighten the definition and finish with one clear exam-ready takeaway.';
    const attempt={id:id(),studentId:b.studentId||'CSE26-001',subject:b.subject||'Programming for Problem Solving (PPS)',question,answer,mode:b.mode||'text',score,feedback,createdAt:new Date().toISOString()};
    d.vivaAttempts.push(attempt); audit(d,'viva_attempt','Student',{attemptId:attempt.id,score,mode:attempt.mode}); writeData(d);
    return json(res,200,{ok:true,attempt,message:`Viva answer evaluated: ${score}/10.`});
  }
  if(req.method==='POST'&&url.pathname==='/api/student-dashboard/faculty-handoff'){
    const b=await body(req);const t={id:id(),title:b.title||'Student needs faculty support',description:b.description||'Created from CampusAI faculty handoff.',raisedBy:b.studentId||'CSE26-001',status:'Open',source:'CampusAI Handoff',createdAt:new Date().toISOString()};d.tickets.push(t);audit(d,'faculty_handoff_created','Student',{ticketId:t.id});writeData(d);return json(res,201,{ok:true,ticket:t,message:`Faculty support ticket #${t.id} created.`});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-dashboard/mock-tests')return json(res,200,{ok:true,attempts:d.mockTests.slice().reverse()});
  if(req.method==='POST'&&url.pathname==='/api/student-dashboard/mock-tests'){
    const b=await body(req),answer=String(b.answer||''),correct=answer==='Stack',attempt={id:id(),studentId:b.studentId||'CSE26-001',question:b.question||'Which data structure follows LIFO?',answer,correct,score:correct?100:0,createdAt:new Date().toISOString()};d.mockTests.push(attempt);audit(d,'mock_test_submitted','Student',{attemptId:attempt.id,score:attempt.score});writeData(d);return json(res,201,{ok:true,attempt,message:correct?'Correct answer. Mock result saved.':'Answer saved. Review the explanation and try again.'});
  }
  if(req.method==='GET'&&url.pathname==='/api/audit')return json(res,200,{ok:true,audit:d.audit.slice(-200).reverse()});
  if(req.method==='POST'&&url.pathname==='/api/ai/chat'){const b=await body(req);const out=aiReply(String(b.message||''),d,b.role||'Student');audit(d,'ai_chat',b.role||'Student',{message:String(b.message||'').slice(0,300)});writeData(d);return json(res,200,{ok:true,...out})}
  if(req.method==='GET'&&url.pathname==='/api/database/health'){
    const submissions=d.assignments.reduce((n,a)=>n+(a.submissions?.length||0),0);
    return json(res,200,{ok:true,database:'CampusLMS JSON database',persistent:true,schemaVersion:d.schemaVersion,records:{assignments:d.assignments.length,resources:d.resources.length,submissions,notifications:d.notificationOutbox.length,webhooks:d.webhookConfigs.length},integrity:'ok',checkedAt:new Date().toISOString()});
  }
  if(req.method==='GET'&&url.pathname==='/api/resource-vault'){
    const department=url.searchParams.get('department'); const semester=url.searchParams.get('semester'); const subject=url.searchParams.get('subject'); const moduleName=url.searchParams.get('module');
    const items=d.resources.filter(r=>(!department||r.department===department)&&(!semester||r.semester===semester)&&(!subject||r.subject===subject)&&(!moduleName||r.module===moduleName));
    const tree={}; for(const r of items){const dep=r.department||'Computer Science & Engineering (IoT)';const sem=r.semester||'Semester I';const sub=r.subject||'General';const mod=r.module||'Module 1';tree[dep]??={};tree[dep][sem]??={};tree[dep][sem][sub]??={};tree[dep][sem][sub][mod]??=[];tree[dep][sem][sub][mod].push(r)}
    return json(res,200,{ok:true,department:department||'Computer Science & Engineering (IoT)',semester:semester||'Semester I',resources:items,tree,path:'Department > Semester > Subject > Module > Resource Type'});
  }
  if(req.method==='GET'&&url.pathname==='/api/notifications') return json(res,200,{ok:true,notifications:d.notificationOutbox.slice(0,100),webhooks:(d.webhookConfigs||[]).map(x=>({...x,secret:undefined}))});
  if(req.method==='POST'&&url.pathname==='/api/notifications/webhooks'){
    const b=await body(req); if(!b.url?.trim()) return json(res,400,{ok:false,error:'Webhook URL is required'});
    const hook={id:id(),provider:b.provider||'Generic',name:b.name||`${b.provider||'Generic'} notification bridge`,url:b.url.trim(),secret:b.secret||'',enabled:b.enabled!==false,createdAt:new Date().toISOString()}; d.webhookConfigs.push(hook); audit(d,'notification_webhook_configured',b.role||'Faculty',{webhookId:hook.id,provider:hook.provider}); writeData(d); return json(res,201,{ok:true,webhook:{...hook,secret:undefined}});
  }
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/notifications/webhooks/')){
    const wid=url.pathname.split('/').pop(),hook=d.webhookConfigs.find(x=>String(x.id)===wid); if(!hook) return json(res,404,{ok:false,error:'Webhook not found'}); const b=await body(req); if(typeof b.enabled==='boolean') hook.enabled=b.enabled; if(b.name) hook.name=b.name; audit(d,'notification_webhook_updated',b.role||'Faculty',{webhookId:hook.id,enabled:hook.enabled}); writeData(d); return json(res,200,{ok:true,webhook:{...hook,secret:undefined}});
  }
  if(req.method==='POST'&&url.pathname==='/api/notifications/test'){
    const b=await body(req); const item=await dispatchNotification(d,{title:b.title||'CampusLMS Test Notification',body:b.body||'Notification webhook test from CampusLMS.',type:'Test',targetRole:b.targetRole||'Student'}); audit(d,'notification_test_sent',b.role||'Faculty',{notificationId:item.id}); writeData(d); return json(res,200,{ok:true,notification:item});
  }
  if(req.method==='GET'&&url.pathname==='/api/notifications/outbox') return json(res,200,{ok:true,items:d.notificationOutbox.slice(0,100)});
  if(req.method==='GET'&&url.pathname==='/api/resources')return json(res,200,{ok:true,resources:d.resources});
  if(req.method==='GET'&&url.pathname.startsWith('/api/resources/')){const key=decodeURIComponent(url.pathname.split('/').pop());const r=d.resources.find(x=>String(x.id)===key||x.title===key);if(!r)return json(res,404,{ok:false,error:'Resource not found'});audit(d,'resource_opened',authRole(req,'Student'),{resourceId:r.id});writeData(d);return json(res,200,{ok:true,resource:r})}
  if(req.method==='GET'&&url.pathname==='/api/assignments')return json(res,200,{ok:true,assignments:d.assignments.map(a=>({...a,locked:deadlinePassed(a.deadline)}))});
  if(req.method==='GET'&&/^\/api\/assignments\/[^/]+$/.test(url.pathname)){const aid=url.pathname.split('/').pop(),a=d.assignments.find(x=>String(x.id)===aid);if(!a)return json(res,404,{ok:false,error:'Assignment not found'});return json(res,200,{ok:true,assignment:{...a,locked:deadlinePassed(a.deadline)}})}
  if(req.method==='POST'&&url.pathname==='/api/assignments'){const b=await body(req);if(!b.title?.trim())return json(res,400,{ok:false,error:'Assignment title is required'});if(!b.subject?.trim())return json(res,400,{ok:false,error:'Subject is required'});const deadline=b.deadline||'2026-10-05';const a={id:id(),title:b.title.trim(),subject:b.subject.trim(),deadline,status:'Pending',submittedBy:[],submissions:[],createdBy:b.facultyId||b.role||'Faculty',createdAt:new Date().toISOString()};d.assignments.push(a);audit(d,'assignment_created',b.role||'Faculty',{assignmentId:a.id});const n=await dispatchNotification(d,{title:`New Assignment: ${a.title}`,body:`${a.subject} • Due ${a.deadline}. Open Assignments in CampusLMS.`,type:'Assignment Published',targetRole:'Student'});audit(d,'assignment_notification_created',b.role||'Faculty',{notificationId:n.id,assignmentId:a.id});writeData(d);return json(res,201,{ok:true,assignment:a,notification:n})}
  if(req.method==='GET'&&/^\/api\/assignments\/[^/]+\/submissions$/.test(url.pathname)){const aid=url.pathname.split('/')[3],a=d.assignments.find(x=>String(x.id)===aid);if(!a)return json(res,404,{ok:false,error:'Assignment not found'});return json(res,200,{ok:true,assignment:{id:a.id,title:a.title,subject:a.subject,deadline:a.deadline,locked:deadlinePassed(a.deadline)},submissions:a.submissions||[]})}
  if(req.method==='POST'&&url.pathname==='/api/assignments/submit'){
    const b=await body(req),a=d.assignments.find(x=>String(x.id)===String(b.assignmentId)); if(!a)return json(res,404,{ok:false,error:'Assignment not found'});
    if(deadlinePassed(a.deadline)) return json(res,423,{ok:false,error:`Submission locked. The deadline for this assignment was ${a.deadline}.`});
    const student=b.studentId||'CSE26-001'; if((a.submissions||[]).some(x=>x.studentId===student)) return json(res,409,{ok:false,error:'A submission already exists for this student. Ask faculty to reopen it if a resubmission is required.'});
    const content=String(b.content||'');
    const fileName=String(b.fileName||'assignment-submission.pdf');
    const fileType=String(b.fileType||'application/octet-stream');
    if(content.length>12e6) return json(res,413,{ok:false,error:'Submission file is too large. Maximum request size is 12 MB.'});
    if(fileType!=='application/pdf' && !/\.pdf$/i.test(fileName)) return json(res,415,{ok:false,error:'Only PDF submissions are accepted in this prototype.'});
    const hash=contentHash(content); const answerText=String(b.answerText||'');
    // Check exact duplicates and high text similarity against previous submissions
    // for the same subject across the batch, not only this assignment.
    const previousSubmissions=[];
    for(const assignment of d.assignments){
      if(assignment.subject!==a.subject) continue;
      for(const other of (assignment.submissions||[])){
        if(other.studentId===student) continue;
        previousSubmissions.push({...other,assignmentId:assignment.id,assignmentTitle:assignment.title});
      }
    }
    const comparisons=previousSubmissions.map(other=>{const exact=other.contentHash===hash&&hash.length>0;const score=exact?100:textSimilarity(answerText,other.answerText||'');return {submissionId:other.id,studentId:other.studentId,assignmentId:other.assignmentId,assignmentTitle:other.assignmentTitle,similarity:score,exact};}).filter(x=>x.exact||x.similarity>=80);
    const sub={id:id(),studentId:student,fileName,fileSize:Number(b.fileSize||0),fileType,content,answerText,contentHash:hash,similarityFlags:comparisons,submittedAt:new Date().toISOString(),status:'Submitted',grade:null,feedback:''};
    if(!Array.isArray(a.submittedBy))a.submittedBy=[]; if(!a.submittedBy.includes(student))a.submittedBy.push(student); a.submissions.push(sub); a.status='In Review';
    audit(d,'assignment_submitted','Student',{assignmentId:a.id,studentId:student,fileName:sub.fileName,similarityFlags:comparisons.length}); writeData(d);
    return json(res,200,{ok:true,assignment:a,submission:sub,similarityFlags:comparisons,message:comparisons.length?`${a.title} submitted. A similarity flag was detected for faculty review.`:`${a.title} submitted successfully.`});
  }
  if(req.method==='POST'&&/^\/api\/assignments\/[^/]+\/grade$/.test(url.pathname)){
    const aid=url.pathname.split('/')[3],a=d.assignments.find(x=>String(x.id)===aid);if(!a)return json(res,404,{ok:false,error:'Assignment not found'});const b=await body(req);const sub=(a.submissions||[]).find(x=>String(x.id)===String(b.submissionId));if(!sub)return json(res,404,{ok:false,error:'Submission not found'});sub.grade=b.grade??sub.grade;sub.feedback=b.feedback??sub.feedback;sub.status='Evaluated';sub.gradedBy=b.facultyId||b.role||'Faculty';sub.gradedAt=new Date().toISOString();if((a.submissions||[]).every(x=>x.status==='Evaluated'))a.status='Evaluated';audit(d,'assignment_graded','Faculty',{assignmentId:a.id,submissionId:sub.id,grade:sub.grade});writeData(d);return json(res,200,{ok:true,assignment:a,submission:sub,message:'Grade and feedback saved successfully.'})}
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/assignments/')){const aid=url.pathname.split('/').pop();const a=d.assignments.find(x=>String(x.id)===aid);if(!a)return json(res,404,{ok:false,error:'Assignment not found'});const b=await body(req);if(b.status)a.status=b.status;if(b.grade)a.grade=b.grade;a.updatedAt=new Date().toISOString();audit(d,'assignment_updated',b.role||'Faculty',{assignmentId:a.id,status:a.status,grade:a.grade});writeData(d);return json(res,200,{ok:true,assignment:a})}
  if(req.method==='GET'&&url.pathname==='/api/announcements')return json(res,200,{ok:true,announcements:d.announcements.slice().reverse()});
  if(req.method==='POST'&&url.pathname==='/api/announcements'){const b=await body(req);if(!b.title?.trim())return json(res,400,{ok:false,error:'Announcement title is required'});const a={id:id(),title:b.title.trim(),body:(b.body||'').trim(),role:safeRole(b.role)||'CR',createdAt:new Date().toISOString()};d.announcements.push(a);audit(d,'announcement_created',a.role,{announcementId:a.id});writeData(d);return json(res,201,{ok:true,announcement:a})}
  if(req.method==='GET'&&url.pathname==='/api/attendance')return json(res,200,{ok:true,attendance:d.attendance});
  if(req.method==='POST'&&url.pathname==='/api/attendance'){const b=await body(req);if(Number.isFinite(+b.present))d.attendance.present=Math.max(0,Math.min(d.attendance.total,+b.present));audit(d,'attendance_updated',b.role||'Faculty',d.attendance);writeData(d);return json(res,200,{ok:true,attendance:d.attendance})}
  if(req.method==='GET'&&url.pathname==='/api/issues')return json(res,200,{ok:true,issues:d.issues.slice().reverse()});
  if(req.method==='GET'&&url.pathname==='/api/tickets')return json(res,200,{ok:true,tickets:d.tickets.slice().reverse()});
  if(req.method==='POST'&&url.pathname==='/api/tickets'){const b=await body(req);if(!b.title?.trim())return json(res,400,{ok:false,error:'Ticket title required'});const t={id:id(),title:b.title.trim(),description:(b.description||'').trim(),raisedBy:b.raisedBy||'CSE26-001',status:'Open',createdAt:new Date().toISOString()};d.tickets.push(t);audit(d,'doubt_ticket_created',b.role||'Student',{ticketId:t.id});writeData(d);return json(res,201,{ok:true,ticket:t})}
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/tickets/')){const tid=url.pathname.split('/').pop(),t=d.tickets.find(x=>String(x.id)===tid);if(!t)return json(res,404,{ok:false,error:'Ticket not found'});const b=await body(req);t.status=b.status||t.status;t.response=b.response||t.response;audit(d,'ticket_updated',b.role||'Faculty',{ticketId:t.id,status:t.status});writeData(d);return json(res,200,{ok:true,ticket:t})}
  if(req.method==='GET'&&url.pathname==='/api/polls')return json(res,200,{ok:true,polls:d.polls.slice().reverse()});
  if(req.method==='POST'&&url.pathname==='/api/polls'){const b=await body(req);if(!b.question?.trim())return json(res,400,{ok:false,error:'Poll question required'});const p={id:id(),question:b.question.trim(),options:b.options?.length?b.options:['Yes','No'],createdBy:b.createdBy||'CR-CSE-01',createdAt:new Date().toISOString(),responses:{}};d.polls.push(p);audit(d,'poll_created','CR',{pollId:p.id});writeData(d);return json(res,201,{ok:true,poll:p})}
  if(req.method==='POST'&&url.pathname.startsWith('/api/polls/')&&url.pathname.endsWith('/respond')){const pid=url.pathname.split('/')[3],p=d.polls.find(x=>String(x.id)===pid);if(!p)return json(res,404,{ok:false,error:'Poll not found'});const b=await body(req);if(!p.options.includes(b.option))return json(res,400,{ok:false,error:'Invalid poll option'});p.responses[b.userId||'CSE26-001']=b.option;audit(d,'poll_response',b.role||'Student',{pollId:p.id,option:b.option});writeData(d);return json(res,200,{ok:true,poll:p})}
  if(req.method==='GET'&&url.pathname==='/api/community/posts')return json(res,200,{ok:true,posts:d.communityPosts.slice(-100).reverse()});
  if(req.method==='POST'&&url.pathname==='/api/community/posts'){const b=await body(req);if(!b.text?.trim())return json(res,400,{ok:false,error:'Post text required'});const post={id:id(),author:b.author||'Campus Student',role:safeRole(b.role)||'Student',text:b.text.trim(),likes:0,likedBy:[],comments:[],createdAt:new Date().toISOString()};d.communityPosts.push(post);audit(d,'community_post_created',post.role,{postId:post.id});writeData(d);return json(res,201,{ok:true,post})}
  if(req.method==='POST'&&/^\/api\/community\/posts\/[^/]+\/like$/.test(url.pathname)){const pid=url.pathname.split('/')[4],post=d.communityPosts.find(x=>String(x.id)===pid);if(!post)return json(res,404,{ok:false,error:'Post not found'});const b=await body(req),uid=b.userId||'CSE26-001';post.likedBy=Array.isArray(post.likedBy)?post.likedBy:[];const at=post.likedBy.indexOf(uid);if(at>=0)post.likedBy.splice(at,1);else post.likedBy.push(uid);post.likes=post.likedBy.length;audit(d,'community_post_liked',b.role||'Student',{postId:post.id,userId:uid,liked:at<0});writeData(d);return json(res,200,{ok:true,post})}
  if(req.method==='POST'&&/^\/api\/community\/posts\/[^/]+\/comments$/.test(url.pathname)){const pid=url.pathname.split('/')[4],post=d.communityPosts.find(x=>String(x.id)===pid);if(!post)return json(res,404,{ok:false,error:'Post not found'});const b=await body(req);if(!b.text?.trim())return json(res,400,{ok:false,error:'Comment text required'});post.comments=Array.isArray(post.comments)?post.comments:[];const comment={id:id(),author:b.author||'Campus Student',role:safeRole(b.role)||'Student',text:b.text.trim(),createdAt:new Date().toISOString()};post.comments.push(comment);audit(d,'community_comment_created',comment.role,{postId:post.id,commentId:comment.id});writeData(d);return json(res,201,{ok:true,post,comment})}
  if(req.method==='POST'&&/^\/api\/community\/posts\/[^/]+\/like$/.test(url.pathname)){
    const pid=url.pathname.split('/')[4],post=d.communityPosts.find(x=>String(x.id)===pid);if(!post)return json(res,404,{ok:false,error:'Post not found'});const b=await body(req),uid=b.userId||'CSE26-001';post.likes=Number(post.likes||0);post.likedBy=Array.isArray(post.likedBy)?post.likedBy:[];const idx=post.likedBy.indexOf(uid);if(idx>=0){post.likedBy.splice(idx,1);post.likes=Math.max(0,post.likes-1)}else{post.likedBy.push(uid);post.likes+=1}audit(d,'community_post_liked',b.role||'Student',{postId:post.id,likes:post.likes});writeData(d);return json(res,200,{ok:true,post})
  }
  if(req.method==='POST'&&/^\/api\/community\/posts\/[^/]+\/comments$/.test(url.pathname)){
    const pid=url.pathname.split('/')[4],post=d.communityPosts.find(x=>String(x.id)===pid);if(!post)return json(res,404,{ok:false,error:'Post not found'});const b=await body(req);if(!b.text?.trim())return json(res,400,{ok:false,error:'Comment required'});post.comments=Array.isArray(post.comments)?post.comments:[];const comment={id:id(),author:b.author||'Campus Student',text:b.text.trim(),createdAt:new Date().toISOString()};post.comments.push(comment);audit(d,'community_comment_created',b.role||'Student',{postId:post.id,commentId:comment.id});writeData(d);return json(res,201,{ok:true,post,comment})
  }
  if(req.method==='GET'&&url.pathname==='/api/question-bank'){
    const subject=url.searchParams.get('subject'); const bank=(d.questionBank||[]).filter(q=>!subject||q.subject===subject); return json(res,200,{ok:true,questions:bank.map(({answer,explanation,...q})=>q),count:bank.length,subjects:[...new Set((d.questionBank||[]).map(q=>q.subject))]});
  }
  if(req.method==='GET'&&url.pathname==='/api/question-bank/stats'){
    const attempts=d.questionAttempts||[]; const total=attempts.length; const correct=attempts.filter(x=>x.correct).length; return json(res,200,{ok:true,total,correct,accuracy:total?Math.round(correct*100/total):0,recent:attempts.slice(-10).reverse()});
  }
  if(req.method==='POST'&&url.pathname==='/api/question-bank/attempt'){
    const b=await body(req),q=(d.questionBank||[]).find(x=>x.id===b.questionId); if(!q)return json(res,404,{ok:false,error:'Question not found'}); const selected=Number(b.selectedIndex); const correct=selected===q.answer; const attempt={id:id(),studentId:b.studentId||'CSE26-001',questionId:q.id,subject:q.subject,selectedIndex:selected,correct,createdAt:new Date().toISOString()}; d.questionAttempts.push(attempt); audit(d,'question_practice_attempt','Student',{questionId:q.id,correct}); writeData(d); return json(res,200,{ok:true,attempt,correct,answer:q.answer,explanation:q.explanation});
  }
  if(req.method==='GET'&&url.pathname==='/api/schedules') return json(res,200,{ok:true,schedules:d.schedules.length?d.schedules:seed.schedules});
  if(req.method==='POST'&&url.pathname==='/api/schedules'){
    const b=await body(req); if(!b.title||!b.time)return json(res,400,{ok:false,error:'Class title and time are required'}); const item={id:id(),time:b.time,title:b.title,detail:b.detail||`${b.faculty||'Faculty'} • ${b.room||'Room TBD'}`,subject:b.subject||'',faculty:b.faculty||'',room:b.room||'',createdAt:new Date().toISOString()}; d.schedules.push(item); audit(d,'schedule_created','Faculty',{scheduleId:item.id}); writeData(d); return json(res,201,{ok:true,schedule:item});
  }
  if(req.method==='GET'&&url.pathname==='/api/student-records') return json(res,200,{ok:true,record:d.studentRecords||seed.studentRecords,updatedAt:new Date().toISOString()});
  if(req.method==='GET'&&url.pathname==='/api/certificates') return json(res,200,{ok:true,certificates:d.certificates||seed.certificates,updatedAt:new Date().toISOString()});
  if(req.method==='GET'&&url.pathname==='/api/syllabus') return json(res,200,{ok:true,college:'Government Engineering College Madhubani',university:'Bihar Engineering University, Patna',programme:'B.Tech Computer Science & Engineering (IoT)',session:'2026-27',semester:'Semester I',configuredCourses:d.syllabus||seed.syllabus,officialCurriculum:d.beu2026Curriculum||seed.beu2026Curriculum,officialUrl:'https://beu-bih.ac.in/academics/Syllabus/B.Tech',regulationUrl:'https://beu-bih.ac.in/backend/1778027052729-UG%20Regulation_05.04.2026.pdf',officialRules:{attendance:'75% minimum attendance for each theory and practical/sessionals',theory:'30 internal + 70 end-semester',practical:'20 internal + 30 end-semester',theoryPass:'35% overall and at least 24.5/70 in ESE',practicalPass:'35% overall and at least 10.5/30 in ESE'},updatedAt:new Date().toISOString()});
  if(req.method==='GET'&&url.pathname==='/api/faculty-directory') return json(res,200,{ok:true,faculty:d.facultyDirectory||seed.facultyDirectory,updatedAt:new Date().toISOString()});
  if(req.method==='GET'&&url.pathname==='/api/faculty/analytics'){const f=userFor(d,'Faculty',url.searchParams.get('facultyId'));const courses=(f.subjects||[]).map((name,i)=>({name,average:[78,72,81,68,75,70][i]||72,assignments:d.assignments.filter(a=>a.subject===name).length,resources:d.resources.filter(r=>r.subject===name).length}));return json(res,200,{ok:true,faculty:f,courses,updatedAt:new Date().toISOString()});}
  if(req.method==='GET'&&url.pathname==='/api/faculty/risk')return json(res,200,{ok:true,students:[{name:'Aditya Singh',risk:'High',reason:'Repeated low scores'},{name:'Priya Mehta',risk:'At Risk',reason:'Attendance and assignment gap'},{name:'Rohan Kumar',risk:'Needs Support',reason:'Recent performance decline'}]});
  if(req.method==='POST'&&url.pathname==='/api/faculty/remedial'){
    const b=await body(req),plan={id:id(),student:b.student||'Class group',topic:b.topic||'Normalization',date:b.date||'Next available session',createdAt:new Date().toISOString()};d.activities.push({id:id(),role:'Faculty',action:'Remedial session planned',meta:plan,createdAt:plan.createdAt});audit(d,'remedial_session_planned','Faculty',plan);writeData(d);return json(res,201,{ok:true,plan,message:'Remedial session saved to the backend.'});
  }
  if(req.method==='POST'&&url.pathname==='/api/faculty/grading'){
    const b=await body(req),result={id:id(),assignmentId:b.assignmentId||null,student:b.student||'Student',grade:b.grade||'A',feedback:b.feedback||'Reviewed by faculty',createdAt:new Date().toISOString()};d.activities.push({id:id(),role:'Faculty',action:'Grading saved',meta:result,createdAt:result.createdAt});audit(d,'grading_saved','Faculty',result);writeData(d);return json(res,201,{ok:true,result,message:'Grade and feedback saved to the backend.'});
  }
  if(req.method==='GET'&&url.pathname==='/api/question-papers')return json(res,200,{ok:true,papers:d.questionPapers.slice().reverse()});
  if(req.method==='POST'&&url.pathname==='/api/question-papers'){const b=await body(req);const subject=b.subject||'Programming for Problem Solving (PPS)';const pool=(d.questionBank||[]).filter(q=>q.subject===subject);const count=Math.min(Number(b.count)||10,30,pool.length||30);const shuffled=[...pool].sort(()=>Math.random()-0.5);const questions=(shuffled.length?shuffled:Array.from({length:count},(_,i)=>({id:`GEN-${i+1}`,question:`${subject} practice question ${i+1}`,unit:'Practice'}))).slice(0,count).map((q,i)=>({number:i+1,id:q.id,unit:q.unit,question:q.question,options:q.options,difficulty:b.difficulty||'Mixed'}));const paper={id:id(),subject,count:questions.length,difficulty:b.difficulty||'Mixed',questions,source:pool.length?'CampusLMS BEU-aligned question bank':'CampusLMS practice generator',createdAt:new Date().toISOString()};d.questionPapers.push(paper);audit(d,'question_paper_generated',b.role||'Faculty',{paperId:paper.id,subject});writeData(d);return json(res,201,{ok:true,paper})}
  if(req.method==='GET'&&url.pathname.startsWith('/api/student-tools/')){const tool=decodeURIComponent(url.pathname.split('/').pop());const state=d.studentTools[tool]||{};const result={ok:true,tool,state};if(tool==='exam-readiness')result.readiness={score:78,weakTopics:['Integration','Vector Calculus','Differential Equations'],recommended:['Revise key formulas (25 min)','Solve 10 PYQs','Take a mini test']};return json(res,200,result)}
  if(req.method==='POST'&&url.pathname.startsWith('/api/student-tools/')){const tool=decodeURIComponent(url.pathname.split('/').pop());const b=await body(req);const previous=d.studentTools[tool]||{};const state={...previous,...(b.state||{}),updatedAt:new Date().toISOString()};d.studentTools[tool]=state;audit(d,'student_tool_updated',b.role||'Student',{tool,state});writeData(d);return json(res,200,{ok:true,tool,state,message:`${tool} progress saved to the backend.`})}
  if(req.method==='GET'&&url.pathname==='/api/workflows'){const uid=url.searchParams.get('userId')||'CSE26-001';return json(res,200,{ok:true,steps:d.workflows[uid]||[]})}
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/workflows/')){const uid='CSE26-001',step=Number(url.pathname.split('/').pop());const steps=d.workflows[uid]||[false,false,false,false];while(steps.length<4)steps.push(false);const b=await body(req);steps[step]=Boolean(b.done);d.workflows[uid]=steps;audit(d,'workflow_step_updated','Student',{step,done:steps[step]});writeData(d);return json(res,200,{ok:true,steps})}
  if(req.method==='GET'&&url.pathname==='/api/study-plan'){const uid=url.searchParams.get('userId')||'CSE26-001';return json(res,200,{ok:true,items:d.studyPlans[uid]||[]})}
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/study-plan/')){const sid=url.pathname.split('/').pop(),uid='CSE26-001',items=d.studyPlans[uid]||[],item=items.find(x=>String(x.id)===sid);if(!item)return json(res,404,{ok:false,error:'Study item not found'});const b=await body(req);item.done=Boolean(b.done);audit(d,'study_item_updated','Student',{studyItemId:item.id,done:item.done});writeData(d);return json(res,200,{ok:true,item})}
  if(req.method==='POST'&&url.pathname==='/api/actions'){const b=await body(req),r=safeRole(b.role)||authRole(req,'Student'),action={id:id(),role:r,action:b.action||'Unknown action',meta:b.meta||{},createdAt:new Date().toISOString()};d.activities.push(action);audit(d,action.action,r,action.meta);writeData(d);return json(res,200,{ok:true,action,message:`${action.action} saved successfully.`})}
  if(req.method==='POST'&&url.pathname==='/api/resources'){const b=await body(req);if(!b.title?.trim())return json(res,400,{ok:false,error:'Resource title required'});const r={id:id(),title:b.title.trim(),type:b.type||'Notes',subject:b.subject||'General',size:b.size||'New',content:b.content||'New resource content',department:b.department||'Computer Science & Engineering (IoT)',semester:b.semester||'Semester I',module:b.module||'Module 1'};r.path=[r.department,r.semester,r.subject,r.module,r.type];d.resources.push(r);audit(d,'resource_created',b.role||'Faculty',{resourceId:r.id,path:r.path});const n=await dispatchNotification(d,{title:`New ${r.type}: ${r.title}`,body:`${r.subject} • ${r.module} is now available in the CampusLMS Resource Vault.`,type:'New Material',targetRole:'Student'});audit(d,'resource_notification_created',b.role||'Faculty',{notificationId:n.id,resourceId:r.id});writeData(d);return json(res,201,{ok:true,resource:r,notification:n})}
  if(req.method==='POST'&&url.pathname==='/api/issues'){const b=await body(req);if(!b.title?.trim())return json(res,400,{ok:false,error:'Issue title required'});const i={id:id(),title:b.title.trim(),description:(b.description||'').trim(),raisedBy:b.raisedBy||'CR-CSE-01',status:'Open',createdAt:new Date().toISOString()};d.issues.push(i);audit(d,'issue_created','CR',{issueId:i.id});writeData(d);return json(res,201,{ok:true,issue:i})}
  if(req.method==='PATCH'&&url.pathname.startsWith('/api/issues/')){const iid=url.pathname.split('/').pop(),i=d.issues.find(x=>String(x.id)===iid);if(!i)return json(res,404,{ok:false,error:'Issue not found'});const b=await body(req);i.status=b.status||i.status;i.response=b.response||i.response;audit(d,'issue_updated',b.role||'Faculty',{issueId:i.id,status:i.status});writeData(d);return json(res,200,{ok:true,issue:i})}
  /* ===== Online Class — scheduling, demo room, session and attendance =====
     Roles follow the same rule as the rest of the API: Faculty may schedule,
     start and end a class; Student and CR may join, leave and drive their own
     in-room controls. Every mutation is validated, audited and persisted. */
  if(req.method==='GET'&&url.pathname==='/api/online-classes'){
    const role=safeRole(url.searchParams.get('role')||authRole(req,'Student'))||'Student';
    const facultyId=url.searchParams.get('facultyId')||null;
    const mine=url.searchParams.get('mine')==='1';
    let list=d.onlineClasses.slice();
    if(mine&&role==='Faculty')list=list.filter(c=>c.facultyId===facultyId||c.facultyId==null);
    const byStatus=s=>list.filter(c=>c.status===s).length;
    return json(res,200,{ok:true,classes:list.sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.time).localeCompare(String(a.time))),role,counts:{total:list.length,scheduled:byStatus('scheduled'),live:byStatus('live'),completed:byStatus('completed')},dayTypes:ONLINE_DAY_TYPES,durations:ONLINE_DURATIONS,updatedAt:new Date().toISOString()});
  }
  if(req.method==='POST'&&url.pathname==='/api/online-classes'){
    const b=await body(req);
    const role=safeRole(b.role)||authRole(req,null);
    if(role!=='Faculty')return json(res,403,{ok:false,error:'Only faculty can schedule an online class'});
    const subject=String(b.subject||'').trim(), topic=String(b.topic||'').trim();
    const date=String(b.date||'').trim(), time=String(b.time||'').trim();
    if(!subject)return json(res,400,{ok:false,error:'Subject is required'});
    if(!topic)return json(res,400,{ok:false,error:'Topic is required'});
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return json(res,400,{ok:false,error:'Date must be YYYY-MM-DD'});
    if(!/^\d{2}:\d{2}$/.test(time))return json(res,400,{ok:false,error:'Time must be HH:MM'});
    const duration=Number(b.durationMin);
    if(!ONLINE_DURATIONS.includes(duration))return json(res,400,{ok:false,error:`Duration must be one of ${ONLINE_DURATIONS.join(', ')} minutes`});
    const dayType=ONLINE_DAY_TYPES.includes(b.dayType)?b.dayType:'Normal Day';
    const facultyId=b.facultyId||(d.facultyDirectory?.[0]?.id)||null;
    const f=(d.facultyDirectory||[]).find(x=>x.id===facultyId)||d.users.Faculty;
    const clash=d.onlineClasses.find(c=>c.date===date&&c.time===time&&c.status!=='completed'&&c.facultyId===facultyId);
    if(clash)return json(res,409,{ok:false,error:`You already have "${clash.subject}" scheduled at ${time} on ${date}`});
    const cls={
      id:id(),roomId:onlineRoomId(subject),joinCode:onlineJoinCode(),
      subject,topic,batch:String(b.batch||'CSE (IoT) — Section A').trim(),
      semester:ATTENDANCE_SEMESTERS.includes(b.semester)?b.semester:'Semester I',
      date,time,durationMin:duration,dayType,
      facultyId,facultyName:f.name,
      status:'scheduled',screenSharing:false,
      createdAt:new Date().toISOString(),startedAt:null,endedAt:null,
      participants:[],attendance:[]
    };
    d.onlineClasses.push(cls);
    /* Mirror into the timetable the dashboards already read, so a scheduled
       online class shows on the Student dashboard without a new endpoint. */
    d.schedules.push({id:cls.id,time:onlinePrettyTime(cls.time),title:`${cls.subject} — Online Class`,detail:`${cls.facultyName} • Online • ${cls.topic} • Room ${cls.roomId}`,subject:cls.subject,faculty:cls.facultyName,room:`Online • ${cls.roomId}`,online:true,onlineClassId:cls.id});
    const n=await dispatchNotification(d,{title:`Online Class Scheduled: ${cls.subject}`,body:`${cls.topic} • ${onlinePrettyDate(cls.date)} at ${onlinePrettyTime(cls.time)} • Join code ${cls.joinCode}`,type:'Online Class',targetRole:'Student',referenceId:cls.id});
    audit(d,'online_class_scheduled','Faculty',{onlineClassId:cls.id,subject:cls.subject,date:cls.date,time:cls.time,dayType:cls.dayType});
    writeData(d);
    return json(res,201,{ok:true,class:cls,notification:n,message:`Online class scheduled. Room ${cls.roomId} • Join code ${cls.joinCode}`});
  }
  if(req.method==='GET'&&/^\/api\/online-classes\/[^/]+$/.test(url.pathname)){
    const cid=decodeURIComponent(url.pathname.split('/')[3]);
    const cls=d.onlineClasses.find(x=>x.id===cid||x.roomId===cid||x.joinCode===cid);
    if(!cls)return json(res,404,{ok:false,error:'Online class not found'});
    return json(res,200,{ok:true,class:cls});
  }
  if(req.method==='POST'&&/^\/api\/online-classes\/[^/]+\/start$/.test(url.pathname)){
    const cid=decodeURIComponent(url.pathname.split('/')[3]);
    const cls=d.onlineClasses.find(x=>x.id===cid||x.roomId===cid||x.joinCode===cid);
    if(!cls)return json(res,404,{ok:false,error:'Online class not found'});
    const b=await body(req), role=safeRole(b.role)||authRole(req,null);
    if(role!=='Faculty')return json(res,403,{ok:false,error:'Only faculty can start this class'});
    if(b.facultyId&&cls.facultyId&&b.facultyId!==cls.facultyId)return json(res,403,{ok:false,error:'This class belongs to another faculty member'});
    if(cls.status==='completed')return json(res,409,{ok:false,error:'This class has already been completed'});
    if(cls.status==='scheduled'){cls.status='live';cls.startedAt=new Date().toISOString();}
    if(!cls.participants.some(p=>p.id===cls.facultyId))cls.participants.push({id:cls.facultyId,name:cls.facultyName,role:'Faculty',host:true,joinedAt:new Date().toISOString(),leftAt:null,muted:true,cameraOn:true,screenSharing:false});
    audit(d,'online_class_started','Faculty',{onlineClassId:cls.id,roomId:cls.roomId});
    writeData(d);
    return json(res,200,{ok:true,class:cls,message:`Class is live in Room ${cls.roomId}`});
  }
  if(req.method==='POST'&&/^\/api\/online-classes\/[^/]+\/end$/.test(url.pathname)){
    const cid=decodeURIComponent(url.pathname.split('/')[3]);
    const cls=d.onlineClasses.find(x=>x.id===cid||x.roomId===cid||x.joinCode===cid);
    if(!cls)return json(res,404,{ok:false,error:'Online class not found'});
    const b=await body(req), role=safeRole(b.role)||authRole(req,null);
    if(role!=='Faculty')return json(res,403,{ok:false,error:'Only faculty can end this class'});
    if(b.facultyId&&cls.facultyId&&b.facultyId!==cls.facultyId)return json(res,403,{ok:false,error:'This class belongs to another faculty member'});
    if(cls.status!=='live')return json(res,409,{ok:false,error:'This class is not live'});
    cls.status='completed';cls.endedAt=new Date().toISOString();cls.screenSharing=false;
    for(const p of cls.participants)if(!p.leftAt)p.leftAt=cls.endedAt;
    /* Attendance: everyone who joined is marked present, with their actual
       time in the room written to the session record. */
    for(const p of cls.participants){
      if(p.role==='Faculty')continue;
      const joined=new Date(p.joinedAt).getTime(),left=new Date(p.leftAt||cls.endedAt).getTime();
      const seconds=Math.max(0,Math.round((left-joined)/1000));
      cls.attendance.push({studentId:p.id,name:p.name,joinedAt:p.joinedAt,leftAt:p.leftAt||cls.endedAt,durationSec:seconds,status:seconds>=Math.min(60,cls.durationMin*30)?'Present':'Partial'});
    }
    d.onlineSessions.push({id:id(),onlineClassId:cls.id,subject:cls.subject,roomId:cls.roomId,date:cls.date,time:cls.time,durationMin:cls.durationMin,startedAt:cls.startedAt,endedAt:cls.endedAt,participants:cls.participants.length,attendance:cls.attendance.slice(),createdAt:new Date().toISOString()});
    audit(d,'online_class_completed','Faculty',{onlineClassId:cls.id,participants:cls.participants.length,attendance:cls.attendance.length});
    writeData(d);
    return json(res,200,{ok:true,class:cls,attendance:cls.attendance,message:`Class completed. Attendance recorded for ${cls.attendance.length} student${cls.attendance.length===1?'':'s'}.`});
  }
  if(req.method==='POST'&&/^\/api\/online-classes\/[^/]+\/join$/.test(url.pathname)){
    const cid=decodeURIComponent(url.pathname.split('/')[3]);
    const cls=d.onlineClasses.find(x=>x.id===cid||x.roomId===cid||x.joinCode===cid);
    if(!cls)return json(res,404,{ok:false,error:'Online class not found'});
    if(cls.status==='completed')return json(res,409,{ok:false,error:'This class has already been completed'});
    const b=await body(req);
    const role=safeRole(b.role)||authRole(req,'Student')||'Student';
    const pid=String(b.userId||(role==='Faculty'?cls.facultyId:(d.users.Student?.id||'CSE26-001')));
    let p=cls.participants.find(x=>x.id===pid);
    if(p){p.leftAt=null;if(p.joinedAt===null)p.joinedAt=new Date().toISOString();}
    else{p={id:pid,name:String(b.name||(role==='Faculty'?cls.facultyName:d.users.Student?.name||'Student')),role,host:false,joinedAt:new Date().toISOString(),leftAt:null,muted:true,cameraOn:false,screenSharing:false};cls.participants.push(p)}
    audit(d,'online_class_joined',role,{onlineClassId:cls.id,userId:pid});
    writeData(d);
    return json(res,200,{ok:true,class:cls,participant:p,message:`Joined Room ${cls.roomId}`});
  }
  if(req.method==='POST'&&/^\/api\/online-classes\/[^/]+\/leave$/.test(url.pathname)){
    const cid=decodeURIComponent(url.pathname.split('/')[3]);
    const cls=d.onlineClasses.find(x=>x.id===cid||x.roomId===cid||x.joinCode===cid);
    if(!cls)return json(res,404,{ok:false,error:'Online class not found'});
    const b=await body(req);
    const role=safeRole(b.role)||authRole(req,'Student')||'Student';
    const pid=String(b.userId||(role==='Faculty'?cls.facultyId:d.users.Student?.id||'CSE26-001'));
    const p=cls.participants.find(x=>x.id===pid);
    if(!p)return json(res,404,{ok:false,error:'You have not joined this class'});
    p.leftAt=new Date().toISOString();
    audit(d,'online_class_left',role,{onlineClassId:cls.id,userId:pid});
    writeData(d);
    return json(res,200,{ok:true,class:cls,participant:p,message:'You left the class.'});
  }
  if(req.method==='POST'&&/^\/api\/online-classes\/[^/]+\/controls$/.test(url.pathname)){
    const cid=decodeURIComponent(url.pathname.split('/')[3]);
    const cls=d.onlineClasses.find(x=>x.id===cid||x.roomId===cid||x.joinCode===cid);
    if(!cls)return json(res,404,{ok:false,error:'Online class not found'});
    const b=await body(req);
    const role=safeRole(b.role)||authRole(req,'Student')||'Student';
    const isHost=role==='Faculty'&&(!cls.facultyId||!b.userId||b.userId===cls.facultyId);
    const pid=String(b.userId||(role==='Faculty'?cls.facultyId:d.users.Student?.id||'CSE26-001'));
    const p=cls.participants.find(x=>x.id===pid);
    if(!p)return json(res,403,{ok:false,error:'Join the class before using room controls'});
    /* Only the host may mute others or take over screen sharing. */
    if(!isHost&&b.targetUserId&&b.targetUserId!==pid)return json(res,403,{ok:false,error:'Only the host can control other participants'});
    const target=b.targetUserId?cls.participants.find(x=>x.id===b.targetUserId):p;
    if(!target)return json(res,404,{ok:false,error:'Participant not found'});
    if(typeof b.muted==='boolean')target.muted=b.muted;
    if(typeof b.cameraOn==='boolean')target.cameraOn=b.cameraOn;
    if(typeof b.handRaised==='boolean')target.handRaised=b.handRaised;
    if(typeof b.screenSharing==='boolean'){if(!isHost)return json(res,403,{ok:false,error:'Only the host can share the screen'});cls.screenSharing=b.screenSharing;target.screenSharing=b.screenSharing}
    audit(d,'online_class_control',role,{onlineClassId:cls.id,userId:pid,targetUserId:target.id,muted:target.muted,cameraOn:target.cameraOn,screenSharing:cls.screenSharing});
    writeData(d);
    return json(res,200,{ok:true,class:cls,participant:target,message:'Room control updated.'});
  }
  if(req.method==='GET'&&url.pathname==='/api/online-classes-sessions/summary'){
    const total=d.onlineSessions.length;
    const attended=d.onlineSessions.reduce((n,s)=>n+(s.attendance?.length||0),0);
    return json(res,200,{ok:true,sessions:d.onlineSessions.slice().reverse(),total,attended,updatedAt:new Date().toISOString()});
  }
  /* ===== Attendance register — Semester > Branch/Class > Subject > date =====
     Roles follow the rest of the API: only Faculty may save a register, and
     every save is validated, audited and persisted so the same view can be
     reopened and updated later. */
  if(req.method==='GET'&&url.pathname==='/api/attendance/options'){
    const role=safeRole(url.searchParams.get('role')||authRole(req,'Student'))||'Student';
    const facultyId=url.searchParams.get('facultyId')||null;
    const f=userFor(d,'Faculty',facultyId);
    const subjects=[...new Set([...(f.subjects||[]),...(d.subjectsProfile||[]).map(s=>s.name)])];
    return json(res,200,{ok:true,semesters:ATTENDANCE_SEMESTERS,branches:ATTENDANCE_BRANCHES,subjects,date:todayISODate(),role});
  }
  if(req.method==='GET'&&url.pathname==='/api/attendance/register'){
    const semester=url.searchParams.get('semester')||'Semester I';
    const branch=url.searchParams.get('branch')||ATTENDANCE_BRANCHES[0];
    const subject=url.searchParams.get('subject')||'';
    const date=url.searchParams.get('date')||todayISODate();
    const students=rosterFor(d,branch);
    const saved=d.attendanceRegisters.find(r=>r.semester===semester&&r.branch===branch&&r.subject===subject&&r.date===date);
    const statusBy=(saved?.records||[]).reduce((m,x)=>{m[x.studentId]=x.status;return m;},{});
    return json(res,200,{
      ok:true,semester,branch,subject,date,
      students:students.map(s=>({rollNo:s.rollNo,studentId:s.studentId,name:s.name,branch:s.branch,status:statusBy[s.studentId]||'Unmarked'})),
      saved:!!saved,
      register:saved||null,
      summary:saved?{present:saved.summary?.present||0,absent:saved.summary?.absent||0,total:saved.summary?.total||students.length,percent:saved.summary?.percent||0}:null,
      updatedAt:new Date().toISOString()
    });
  }
  if(req.method==='POST'&&url.pathname==='/api/attendance/register'){
    const b=await body(req);
    const role=safeRole(b.role)||authRole(req,null);
    if(role!=='Faculty')return json(res,403,{ok:false,error:'Only faculty can save an attendance register'});
    const semester=String(b.semester||'').trim(),branch=String(b.branch||'').trim(),subject=String(b.subject||'').trim(),date=String(b.date||'').trim();
    if(!ATTENDANCE_SEMESTERS.includes(semester))return json(res,400,{ok:false,error:'Select a valid semester'});
    if(!ATTENDANCE_BRANCHES.includes(branch))return json(res,400,{ok:false,error:'Select a valid branch or class'});
    if(!subject)return json(res,400,{ok:false,error:'Select a subject'});
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return json(res,400,{ok:false,error:'Date must be YYYY-MM-DD'});
    const marks=Array.isArray(b.records)?b.records:[];
    if(!marks.length)return json(res,400,{ok:false,error:'No student records were submitted'});
    const roster=rosterFor(d,branch);
    const valid=new Set(roster.map(s=>s.studentId));
    const records=[];
    for(const m of marks){
      const studentId=String(m.studentId||'');
      if(!valid.has(studentId))return json(res,400,{ok:false,error:`Student ${studentId} is not on the ${branch} roster`});
      const status=['Present','Absent'].includes(m.status)?m.status:'Unmarked';
      records.push({rollNo:Number(m.rollNo)||roster.find(s=>s.studentId===studentId).rollNo,studentId,name:roster.find(s=>s.studentId===studentId).name,status});
    }
    records.sort((x,y)=>x.rollNo-y.rollNo);
    const present=records.filter(r=>r.status==='Present').length;
    const absent=records.filter(r=>r.status==='Absent').length;
    const unmarked=records.filter(r=>r.status==='Unmarked').length;
    const summary={present,absent,unmarked,total:records.length,percent:records.length?Math.round(present*100/records.length):0};
    const f=userFor(d,'Faculty',b.facultyId);
    const existing=d.attendanceRegisters.find(r=>r.semester===semester&&r.branch===branch&&r.subject===subject&&r.date===date);
    if(existing){
      existing.records=records;existing.summary=summary;existing.updatedAt=new Date().toISOString();
      existing.updatedBy=f.name;existing.history=[...(existing.history||[]),{at:existing.updatedAt,by:f.name,present,absent,unmarked}].slice(-20);
    }else{
      d.attendanceRegisters.push({id:id(),semester,branch,subject,date,facultyId:f.id,facultyName:f.name,records,summary,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),updatedBy:f.name,history:[{at:new Date().toISOString(),by:f.name,present,absent,unmarked}]});
    }
    audit(d,'attendance_register_saved','Faculty',{semester,branch,subject,date,...summary});
    writeData(d);
    return json(res,200,{ok:true,register:(existing||d.attendanceRegisters[d.attendanceRegisters.length-1]),summary,message:`Attendance saved — ${present} present, ${absent} absent${unmarked?`, ${unmarked} unmarked`:''}.`});
  }
  if(req.method==='GET'&&url.pathname==='/api/attendance/registers'){
    return json(res,200,{ok:true,registers:d.attendanceRegisters.slice().reverse(),total:d.attendanceRegisters.length,updatedAt:new Date().toISOString()});
  }
  return json(res,404,{ok:false,error:'API route not found'});
 }catch(e){console.error(e);return json(res,500,{ok:false,error:e.message})}
});
ensureData();server.listen(4000,()=>console.log('CampusLMS API running at http://localhost:4000'));
