import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import PortfolioPage from './PortfolioPage';

interface TerminalLine {
  id: string;
  text: string;
  type: 'system' | 'user' | 'output' | 'error';
  timestamp: number;
  isClickable?: boolean;
  url?: string;
}

const TerminalInterface: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentSection, setCurrentSection] = useState('main');
  const [isTyping, setIsTyping] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Initial boot sequence
  useEffect(() => {
    const bootSequence = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║                    NEURAL HACKER PORTFOLIO                   ║',
      '║                      Command Interface                       ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      'Welcome to the Neural Network Portfolio System',
      'Type commands to navigate:',
      '',
      '📁 /projects    - View project files and executables',
      '🧠 /skills     - Access skill matrix database',
      '👤 /about      - Display system information',
      '📋 /portfolio  - Complete portfolio overview',
      '❓ /help       - Show all available commands',
      '🧹 /clear      - Clear terminal screen',
      '',
      '🎮 BONUS COMMANDS:',
      '🔢 /matrix     - Run matrix simulation',
      '🔓 /hack       - Execute hacking sequence',
      '',
      '💡 TIP: Use /portfolio for a complete overview or explore individual sections',
      'Type a command to begin exploration...'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        addLine(bootSequence[index], 'system');
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const addLine = (text: string, type: TerminalLine['type']) => {
    const newLine: TerminalLine = {
      id: Date.now().toString() + Math.random(),
      text,
      type,
      timestamp: Date.now()
    };
    setLines(prev => [...prev, newLine]);
  };

  const addClickableLine = (text: string, type: TerminalLine['type'], url: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString() + Math.random(),
      text,
      type,
      timestamp: Date.now(),
      isClickable: true,
      url
    };
    setLines(prev => [...prev, newLine]);
  };

  const typewriterEffect = async (text: string, type: TerminalLine['type']) => {
    setIsTyping(true);
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      
      setLines(prev => {
        const newLines = [...prev];
        const lastLine = newLines[newLines.length - 1];
        
        if (lastLine && lastLine.type === 'output' && lastLine.text === '') {
          lastLine.text = currentText;
        } else {
          newLines.push({
            id: Date.now().toString() + Math.random(),
            text: currentText,
            type,
            timestamp: Date.now()
          });
        }
        
        return newLines;
      });
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setIsTyping(false);
  };

  const handleClose = () => {
    addLine('> SYSTEM SHUTDOWN INITIATED...', 'system');
    addLine('❌ CONNECTION TERMINATED', 'error');
    addLine('💀 NEURAL_NET.EXE has stopped responding', 'error');
    addLine('', 'output');
    addLine('🔄 Type /restart to reinitialize system', 'system');
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      addLine('> MINIMIZING TERMINAL INTERFACE...', 'system');
      addLine('📦 WINDOW MINIMIZED', 'output');
    } else {
      addLine('> RESTORING TERMINAL INTERFACE...', 'system');
      addLine('📤 WINDOW RESTORED', 'output');
    }
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      addLine('> MAXIMIZING TERMINAL INTERFACE...', 'system');
      addLine('🔍 FULL SCREEN MODE ACTIVATED', 'output');
    } else {
      addLine('> RESTORING WINDOW SIZE...', 'system');
      addLine('📐 NORMAL VIEW MODE ACTIVATED', 'output');
    }
  };

  const handleRestart = () => {
    setLines([]);
    setCurrentSection('main');
    addLine('🔄 SYSTEM RESTART INITIATED...', 'system');
    addLine('⚡ NEURAL_NET.EXE REBOOTING...', 'system');
    addLine('✅ SYSTEM ONLINE', 'system');
    addLine('Type /help for available commands.', 'system');
  };

  const handleCommand = async (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    // Add user input to terminal
    addLine(`> ${command}`, 'user');
    
    // Add empty line for typewriter effect
    addLine('', 'output');
    
    switch (cmd) {
      case '/projects':
        setCurrentSection('projects');
        await typewriterEffect('ACCESSING PROJECT_FILES.DIR...', 'output');
        addLine('', 'output');
        addLine('╔══════════════════════════════════════════════════════════════╗', 'output');
        addLine('║                        PROJECT FILES                         ║', 'output');
        addLine('╚══════════════════════════════════════════════════════════════╝', 'output');
        addLine('', 'output');
        
        portfolioData.projects.forEach(async (project, index) => {
          setTimeout(() => {
            addLine(`📂 [${project.id.toUpperCase()}] ${project.title}`, 'output');
            addLine(`   📝 DESCRIPTION: ${project.description}`, 'output');
            addLine(`   🔧 TECHNOLOGIES: ${project.technologies.join(', ')}`, 'output');
            addLine(`   📊 CATEGORY: ${project.category.toUpperCase()}`, 'output');
            if (project.featured) addLine(`   ⭐ STATUS: FEATURED PROJECT`, 'output');
            if (project.demoUrl) addClickableLine(`   🌐 DEMO: ${project.demoUrl}`, 'output', project.demoUrl);
            if (project.githubUrl) addClickableLine(`   📋 SOURCE: ${project.githubUrl}`, 'output', project.githubUrl);
            addLine('   ─────────────────────────────────────────────────────────────', 'output');
            addLine('', 'output');
          }, index * 400);
        });
        break;
        
      case '/skills':
        setCurrentSection('skills');
        await typewriterEffect('LOADING SKILL_MATRIX.DB...', 'output');
        addLine('', 'output');
        addLine('╔══════════════════════════════════════════════════════════════╗', 'output');
        addLine('║                        SKILL MATRIX                          ║', 'output');
        addLine('╚══════════════════════════════════════════════════════════════╝', 'output');
        addLine('', 'output');
        
        const skillCategories = ['languages', 'frameworks', 'backend', 'frontend', 'tools'];
        
        skillCategories.forEach((category, catIndex) => {
          const categorySkills = portfolioData.skills.filter(skill => skill.category === category);
          if (categorySkills.length > 0) {
            setTimeout(() => {
              addLine(`🔹 [${category.toUpperCase()}]`, 'output');
              categorySkills.forEach((skill, skillIndex) => {
                setTimeout(() => {
                  const progressBar = '█'.repeat(Math.floor(skill.level / 10)) + '░'.repeat(10 - Math.floor(skill.level / 10));
                  addLine(`   ${skill.name.padEnd(15)} [${progressBar}] ${skill.level}%`, 'output');
                }, skillIndex * 100);
              });
              setTimeout(() => {
                addLine('', 'output');
              }, categorySkills.length * 100 + 200);
            }, catIndex * 800);
          }
        });
        break;
        
      case '/about':
        setCurrentSection('about');
        await typewriterEffect('ACCESSING SYSTEM_INFO.DAT...', 'output');
        addLine('', 'output');
        addLine('╔══════════════════════════════════════════════════════════════╗', 'output');
        addLine('║                      SYSTEM INFORMATION                      ║', 'output');
        addLine('╚══════════════════════════════════════════════════════════════╝', 'output');
        addLine('', 'output');
        addLine('👤 PERSONAL_DATA:', 'output');
        addLine(`   NAME: ${portfolioData.about.name}`, 'output');
        addLine(`   ROLE: ${portfolioData.about.title}`, 'output');
        addLine(`   STATUS: ONLINE`, 'output');
        addLine(`   LOCATION: THE_MATRIX`, 'output');
        addLine('', 'output');
        addLine('📡 CONTACT_PROTOCOLS:', 'output');
        addClickableLine(`   EMAIL: ${portfolioData.about.contact.email}`, 'output', `mailto:${portfolioData.about.contact.email}`);
        addClickableLine(`   GITHUB: ${portfolioData.about.contact.github}`, 'output', portfolioData.about.contact.github);
        addClickableLine(`   LINKEDIN: ${portfolioData.about.contact.linkedin}`, 'output', portfolioData.about.contact.linkedin);
        addLine('', 'output');
        addLine('📋 BIO_DATA:', 'output');
        addLine(`   ${portfolioData.about.bio}`, 'output');
        break;
        
      case '/portfolio':
        await typewriterEffect('LOADING COMPLETE PORTFOLIO INTERFACE...', 'output');
        setTimeout(() => {
          setShowPortfolio(true);
        }, 1000);
        break;
        
      case '/help':
        await typewriterEffect('DISPLAYING COMMAND REFERENCE...', 'output');
        addLine('', 'output');
        addLine('╔══════════════════════════════════════════════════════════════╗', 'output');
        addLine('║                     AVAILABLE COMMANDS                       ║', 'output');
        addLine('╚══════════════════════════════════════════════════════════════╝', 'output');
        addLine('', 'output');
        addLine('📁 /projects    - View project files and executables', 'output');
        addLine('🧠 /skills     - Access skill matrix database', 'output');
        addLine('👤 /about      - Display system information', 'output');
        addLine('📋 /portfolio  - Complete portfolio overview', 'output');
        addLine('🧹 /clear      - Clear terminal screen', 'output');
        addLine('❓ /help       - Show this command reference', 'output');
        addLine('', 'output');
        addLine('🎮 BONUS COMMANDS:', 'output');
        addLine('🔢 /matrix     - Run matrix simulation', 'output');
        addLine('🔓 /hack       - Execute hacking simulation', 'output');
        addLine('🌐 /status     - Show system status', 'output');
        addLine('🔄 /restart    - Restart the terminal system', 'output');
        addLine('', 'output');
        addLine('💡 TIP: Commands are case-insensitive and must start with /', 'output');
        break;
        
      case '/clear':
        setLines([]);
        addLine('Terminal cleared.', 'system');
        addLine('Type /help for available commands.', 'system');
        break;
        
      case '/matrix':
        await typewriterEffect('INITIALIZING MATRIX SIMULATION...', 'output');
        addLine('', 'output');
        const matrixLines = [
          '01001001 11010110 00110101 10101010 01110011',
          '11100011 00101101 11010010 01001110 10110100',
          '00110110 10101111 01001001 11010110 00110101',
          '10101010 01110011 11100011 00101101 11010010',
          '01001110 10110100 00110110 10101111 01001001'
        ];
        matrixLines.forEach((line, index) => {
          setTimeout(() => {
            addLine(`🔢 ${line}`, 'output');
          }, index * 200);
        });
        setTimeout(() => {
          addLine('', 'output');
          addLine('✅ MATRIX SIMULATION COMPLETE', 'output');
        }, 1200);
        break;
        
      case '/hack':
        await typewriterEffect('INITIATING HACK SEQUENCE...', 'output');
        addLine('', 'output');
        const hackSteps = [
          'Scanning network topology...',
          'Bypassing firewall protocols...',
          'Injecting payload...',
          'Escalating privileges...',
          'Decrypting secure channels...',
          'ACCESS GRANTED'
        ];
        hackSteps.forEach((step, index) => {
          setTimeout(() => {
            const icon = index === hackSteps.length - 1 ? '✅' : '🔓';
            addLine(`${icon} [${index + 1}/${hackSteps.length}] ${step}`, 'output');
          }, index * 700);
        });
        break;

      case '/status':
        await typewriterEffect('RETRIEVING SYSTEM STATUS...', 'output');
        addLine('', 'output');
        addLine('🖥️  CPU USAGE: 98%', 'output');
        addLine('💾 MEMORY: 15.7GB / 16GB', 'output');
        addLine('🌐 NETWORK: CONNECTED', 'output');
        addLine('🔒 SECURITY: MAXIMUM', 'output');
        addLine('⚡ POWER: OPTIMAL', 'output');
        addLine('🎯 MISSION: PORTFOLIO_DISPLAY', 'output');
        break;

      case '/restart':
        handleRestart();
        break;
        
      default:
        if (cmd.startsWith('/')) {
          addLine(`❌ Command not found: ${cmd}`, 'error');
          addLine('💡 Type /help for available commands.', 'system');
        } else {
          addLine(`❌ Invalid syntax: ${command}`, 'error');
          addLine('💡 Commands must start with /. Type /help for available commands.', 'system');
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isTyping) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'system': return 'text-cyan-400';
      case 'user': return 'text-white';
      case 'output': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  const renderTerminalLine = (line: TerminalLine) => {
    if (line.isClickable && line.url) {
      return (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`${getLineColor(line.type)} mb-1 leading-relaxed`}
        >
          {line.type === 'user' && <span className="text-green-400">neural@matrix:~$ </span>}
          <a 
            href={line.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 hover:underline transition-colors cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {line.text}
          </a>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={line.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className={`${getLineColor(line.type)} mb-1 leading-relaxed`}
      >
        {line.type === 'user' && <span className="text-green-400">neural@matrix:~$ </span>}
        {line.text}
      </motion.div>
    );
  };

  if (showPortfolio) {
    return <PortfolioPage onBack={() => setShowPortfolio(false)} />;
  }

  return (
    <div className={`w-full h-full bg-black bg-opacity-90 backdrop-blur-sm border-2 border-green-400 flex flex-col transition-all duration-300 ${
      isMinimized ? 'transform scale-95 opacity-80' : ''
    } ${isMaximized ? 'border-4 border-cyan-400' : ''}`}>
      {/* Terminal header */}
      <div className="flex items-center justify-between p-4 border-b border-green-400 bg-black bg-opacity-80">
        <div className="flex items-center space-x-3">
          <Terminal className="w-6 h-6 text-green-400" />
          <span className="text-green-400 text-lg font-mono font-bold">TALHA_SHAIKH.EXE</span>
          <span className="text-cyan-400 text-sm">v2.1.7</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-200 cursor-pointer"
            title="Close Terminal"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-200 cursor-pointer"
            title="Minimize Terminal"
          />
          <button
            onClick={handleMaximize}
            className={`w-3 h-3 rounded-full hover:shadow-lg transition-all duration-200 cursor-pointer ${
              isMaximized 
                ? 'bg-cyan-500 hover:bg-cyan-400 hover:shadow-cyan-500/50' 
                : 'bg-green-500 hover:bg-green-400 hover:shadow-green-500/50'
            }`}
            title={isMaximized ? "Restore Window" : "Maximize Terminal"}
          />
        </div>
      </div>
      
      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className={`flex-1 p-4 overflow-y-auto font-mono text-sm bg-black bg-opacity-50 transition-all duration-300 ${
          isMinimized ? 'opacity-60' : ''
        }`}
      >
        <AnimatePresence>
          {lines.map((line) => renderTerminalLine(line))}
        </AnimatePresence>
        
        {/* Current input line */}
        <div className="flex items-center mt-2">
          <span className="text-green-400 mr-2">neural@matrix:~$</span>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="bg-transparent text-green-400 outline-none flex-1 font-mono"
              placeholder="Type a command..."
              disabled={isTyping}
            />
          </form>
          <span className="text-green-400 animate-pulse ml-1">█</span>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="border-t border-green-400 p-2 flex justify-between text-sm bg-black bg-opacity-80">
        <div className="flex items-center space-x-4">
          <span className="text-green-400">STATUS: ONLINE</span>
          <span className="text-cyan-400">SECTION: {currentSection.toUpperCase()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-green-400" />
          <span className="text-green-400">CPU: 98%</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;