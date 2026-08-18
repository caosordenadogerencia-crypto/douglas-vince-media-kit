/**
 * Direção: interface de jogo em dossiê — preto dominante, dourado queimado, verde ácido e ciano.
 * Princípios: Manrope em todo o sistema, pessoa central, painéis modulares e microinformações periféricas.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Camera, ChevronRight, Cpu, Instagram, ScanLine, Sparkles } from "lucide-react";

const assets = {
  logo: "/assets/portrait-hunter-logo-final.png",
  signal: "/assets/dv-hero-signal.png",
  metrics: "/assets/dv-metrics-field.png",
  equipment: "/assets/dv-equipment-light.png",
  audience: "/assets/dv-audience-spectrum.png",
  studio: "/assets/douglas-studio.webp",
  heroCutout: "/assets/douglas-hero-alpha.png",
  heroHorse: "/assets/hero-horse-sunglasses.png",
  camera: "/assets/douglas-camera.jpg",
  portrait: "/assets/douglas-bw-portrait.png",
  ember: "/assets/portrait-ember-front.jpg",
  blue: "/assets/portrait-blue-orange-wide.jpg",
  insightA: "/assets/instagram-insights-overview.jpeg",
  insightB: "/assets/instagram-insights-audience.jpeg",
};

function useCounter(target: number) {
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(true), { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const draw = (time: number) => {
      const progress = Math.min((time - start) / 1200, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);
  return { ref, value };
}

function Metric({ amount, label, note, prefix = "" }: { amount: number; label: string; note: string; prefix?: string }) {
  const { ref, value } = useCounter(amount);
  return <div className="hud-metric" ref={ref}><div><span>{label}</span><i /></div><strong>{prefix}{value.toLocaleString("pt-BR")}</strong><small>{note}</small></div>;
}

function DeckLabel({ code, children }: { code: string; children: string }) {
  return <div className="deck-label"><b>{code}</b><span>{children}</span><i /></div>;
}

function FooterNav() {
  return <div className="panel-nav"><a href="#topo" aria-label="Início">INÍCIO</a><a href="#perfil">PERFIL</a><a href="#alcance">ALCANCE</a><a href="#portfolio">PORTFÓLIO</a><a href="#publico">PÚBLICO</a><span><ScanLine size={12} /> DV_2026</span></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main className="wd-site" id="topo">
    <div className="grain" aria-hidden="true" />
    <header className="wd-header">
      <a className="wd-mark" href="#topo"><img src={assets.logo} alt="Portrait Hunter" /><span>DOUGLAS<br />VINCE</span></a>
      <span className="wd-index">003</span>
      <button className="wd-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} type="button">{menuOpen ? "FECHAR" : "MENU"}</button>
      <nav className={menuOpen ? "expanded" : ""} aria-label="Navegação principal">
        <a onClick={() => setMenuOpen(false)} href="#perfil">PERFIL</a><a onClick={() => setMenuOpen(false)} href="#alcance">ALCANCE</a><a onClick={() => setMenuOpen(false)} href="#portfolio">PORTFÓLIO</a><a onClick={() => setMenuOpen(false)} href="#publico">PÚBLICO</a>
      </nav>
    </header>

    <section className="hero-panel panel" aria-labelledby="hero-title">
      <img className="hero-field" src={assets.signal} alt="" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-side-code left">D·V<br />01<br />PRESENÇA</div><div className="hero-side-code right">SINAL<br />ATIVO<br />BRASIL</div>
      <div className="hero-halo" aria-hidden="true" /><img className="hero-person hero-horse" src={assets.heroHorse} alt="Cavalo humanoide de óculos escuros em composição cinematográfica" />
      <div className="hero-cutout left" aria-hidden="true" /><div className="hero-cutout right" aria-hidden="true" />
      <div className="hero-title-wrap"><p>ESPECIALISTA EM IA / RETRATOS / VÍDEOS / CRIATIVIDADE</p><h1 id="hero-title">DOUGLAS <span>VINCE</span></h1><div className="hero-rule"><i /> <b>VENDAS, FOTOGRAFIA E PRODUÇÃO DE CONTEÚDO</b></div></div>
      <div className="hero-actions"><a href="#perfil">CONHECER O ARTISTA <ArrowDown size={13} /></a><a href="#alcance">VER ALCANCE <ArrowUpRight size={13} /></a></div>
      <FooterNav />
    </section>

    <section className="profile-panel panel" id="perfil" aria-labelledby="profile-title">
      <DeckLabel code="01" >PERFIL</DeckLabel>
      <div className="profile-image"><div className="cyan-card" /><img src={assets.camera} alt="Douglas Vince trabalhando com uma câmera Canon" /><p><Camera size={13} /> DIREÇÃO DE IMAGEM</p></div>
      <div className="profile-copy"><p className="micro">QUEM ESTÁ POR TRÁS DA CAPTURA</p><h2 id="profile-title">IMAGEM É<br /><span>POSIÇÃO.</span></h2><p>Especialista em IA, retratos, vídeos e criatividade, Douglas Vince atua com imagem desde 2015. Entre fotografia artística, eventos, casamentos e edição em Photoshop, construiu um olhar que lê presença antes de apertar o obturador.</p><p>Desde 2018, expandiu a narrativa para VSLs, vídeos curtos e produção audiovisual. Hoje atua como videomaker, dono de agência e produtora, além de palestrante em eventos.</p><div className="profile-tags"><span>IA CRIATIVA</span><span>RETRATOS</span><span>VÍDEOS</span><span>CRIATIVIDADE</span></div><div className="profile-themes"><b>TEMAS DO PERFIL</b><span>VENDAS</span><span>FOTOGRAFIA</span><span>PRODUÇÃO DE CONTEÚDO</span><span>CAPTAÇÃO DE CURSOS</span><span>PALESTRAS</span></div></div>
      <div className="profile-code">CAMPO_001<br />CAPTURA HUMANA<br />STATUS: ONLINE</div>
      <FooterNav />
    </section>

    <section className="reach-panel panel" id="alcance" aria-labelledby="reach-title">
      <img className="reach-field" src={assets.metrics} alt="" aria-hidden="true" />
      <DeckLabel code="02">ALCANCE DIGITAL</DeckLabel>
      <div className="reach-head"><div><p className="micro"><Instagram size={13} /> INSTAGRAM INSIGHTS</p><h2 id="reach-title">DADOS EM<br /><span>MOVIMENTO.</span></h2></div><p>Leitura do ciclo de 90 dias exibido nas capturas de Insights. Métricas apresentadas como sinal operacional, não como decoração.</p></div>
      <div className="hud-board"><div className="hud-top"><span><i /> SINAL DE AUDIÊNCIA</span><span>JANELA / 90 DIAS</span></div><div className="hud-grid"><Metric amount={371278} label="VISUALIZAÇÕES" note="todos os conteúdos" /><Metric amount={1658} prefix="+" label="SEGUIDORES LÍQUIDOS" note="crescimento no período" /><Metric amount={227478} label="VISUALIZADORES" note="pessoas alcançadas" /><Metric amount={7052} label="SEGUIDORES" note="base exibida" /></div>
        <div className="hud-chart"><div><span>FLUXO DE ALCANCE</span><strong>+30,7% <small>crescimento da base</small></strong></div><svg viewBox="0 0 800 155" preserveAspectRatio="none" aria-hidden="true"><path className="chart-grid" d="M0 25H800M0 78H800M0 130H800"/><path className="chart-fill" d="M0 122 L26 115 L42 130 L61 123 L80 132 L126 126 L154 129 L181 123 L211 129 L248 125 L280 106 L297 121 L320 104 L341 114 L361 98 L379 120 L410 127 L440 122 L467 124 L493 109 L514 117 L536 130 L558 125 L584 121 L604 107 L621 120 L640 105 L656 115 L671 91 L684 31 L697 103 L711 61 L725 112 L739 20 L752 40 L767 82 L780 14 L791 118 L800 125 L800 155 L0 155Z"/><path className="chart-line" d="M0 122 L26 115 L42 130 L61 123 L80 132 L126 126 L154 129 L181 123 L211 129 L248 125 L280 106 L297 121 L320 104 L341 114 L361 98 L379 120 L410 127 L440 122 L467 124 L493 109 L514 117 L536 130 L558 125 L584 121 L604 107 L621 120 L640 105 L656 115 L671 91 L684 31 L697 103 L711 61 L725 112 L739 20 L752 40 L767 82 L780 14 L791 118 L800 125"/></svg><footer><span>20 MAI</span><span>03 JUL</span><span>16 AGO</span></footer></div>
        <div className="hud-source"><span>ORIGEM DA AUDIÊNCIA</span><div><b>8,7% SEGUIDORES</b><strong>91,3% NÃO SEGUIDORES</strong></div></div>
      </div>
      <aside className="insight-evidence"><p>CAPTURAS<br />ORIGINAIS</p><a href={assets.insightA} target="_blank" rel="noreferrer"><img src={assets.insightA} alt="Insights de visualizações do Instagram" /><span>VER ARQUIVO <ArrowUpRight size={12} /></span></a><a href={assets.insightB} target="_blank" rel="noreferrer"><img src={assets.insightB} alt="Insights de seguidores do Instagram" /><span>VER ARQUIVO <ArrowUpRight size={12} /></span></a></aside>
      <FooterNav />
    </section>

    <section className="portfolio-panel panel" id="portfolio" aria-labelledby="portfolio-title">
      <DeckLabel code="03">PORTFÓLIO</DeckLabel>
      <div className="portfolio-head"><p className="micro">AUTORRETRATOS / CANON T5 / PHOTOSHOP</p><h2 id="portfolio-title">AUTORRETRATOS<br /><span>EM FOCO.</span></h2><p>Série de autoretratos produzidos com Canon T5 e finalizados em Photoshop, onde captura e edição se encontram para construir personagens, cor e presença.</p></div>
      <div className="case-strip"><article><img src={assets.portrait} alt="Autorretrato em preto e branco feito com Canon T5" /><span>01</span><footer>AUTORRETRATO / T5</footer></article><article className="cyan-case"><img src={assets.ember} alt="Autorretrato artístico em luz âmbar editado em Photoshop" /><span>02</span><footer>EDIÇÃO / PHOTOSHOP</footer></article><article><img src={assets.blue} alt="Autorretrato artístico azul e âmbar feito com Canon T5" /><span>03</span><footer>CAPTURA + EDIÇÃO</footer></article></div>
      <FooterNav />
    </section>

    <section className="experience-panel panel" aria-labelledby="experience-title">
      <img className="equipment-field" src={assets.equipment} alt="" aria-hidden="true" />
      <DeckLabel code="04">BAGAGEM PROFISSIONAL</DeckLabel>
      <div className="experience-head"><p className="micro">TRAJETÓRIA / SISTEMA</p><h2 id="experience-title">DO OLHAR À<br /><span>ENTREGA.</span></h2></div>
      <ol className="experience-timeline"><li><time>2015</time><div><h3>FOTOGRAFIA DE RETRATO</h3><p>Fotografia artística, eventos, casamentos e pós-produção avançada em Photoshop.</p></div></li><li><time>2018</time><div><h3>VÍDEO COM INTENÇÃO</h3><p>VSLs e vídeos curtos para combinar narrativa, ritmo e comunicação.</p></div></li><li><time>HOJE</time><div><h3>AGÊNCIA, PRODUTORA E PALCO</h3><p>Videomaker profissional, proprietário de agência e produtora, e palestrante em eventos.</p></div></li></ol>
      <div className="gear-module"><p><Cpu size={15} /> EQUIPAMENTOS</p><div><span>CANON T5 <small>INÍCIO</small></span><span>CANON SL3</span><span>CANON R8</span><span>50 MM</span><span>24 MM</span><span>35 MM</span><span>100 MM</span><span>70–200 MM</span></div></div>
      <FooterNav />
    </section>

    <section className="audience-panel panel" id="publico" aria-labelledby="audience-title">
      <img className="audience-field" src={assets.audience} alt="" aria-hidden="true" />
      <DeckLabel code="05">ICP E PÚBLICO</DeckLabel>
      <div className="audience-copy"><p className="micro">MAPA DE AUDIÊNCIA</p><h2 id="audience-title">ENSINAR.<br /><span>INFLUENCIAR.</span></h2></div>
      <div className="audience-card"><div><p>FAIXA ETÁRIA DE MAIOR PRESENÇA</p><strong>25<em>–</em>45</strong><small>ANOS</small></div><div><p>ICP PRIORITÁRIO</p><span><Sparkles size={14} /> PROFESSORES</span><span><Sparkles size={14} /> ESPECIALISTAS</span><small>Profissionais que transformam conhecimento em autoridade e precisam de conteúdo, imagem e vídeo à altura da própria expertise.</small></div></div>
      <FooterNav />
    </section>

    <footer className="closing-panel panel"><div className="closing-brand"><img src={assets.logo} alt="Portrait Hunter" /><span>DOUGLAS VINCE</span></div><p className="micro">MÍDIA KIT / 2026</p><h2>IMAGEM COM<br /><span>POSIÇÃO.</span></h2><p>Retrato, vídeo, direção visual e conteúdo para quem não quer passar despercebido.</p><a href="#topo">VOLTAR AO TOPO <ChevronRight size={17} /></a><div className="closing-status">SINAL ENCERRADO <i /> DV_2026</div></footer>
  </main>;
}
