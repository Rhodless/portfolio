import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const welcome_ascii = `
                            
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣀⣤⣤⢤⣄⣀⡀⠀⠀⢀⠔⠉⠙⣀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢖⡽⣺⠱⣎⣳⡞⣯⠽⣶⣍⠀⠀⠀⠀⢨⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⡼⣏⠻⡜⣥⣻⡼⣳⡝⣎⢿⣱⢻⣧⡀⠀⢀⠎⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣳⣬⢷⡻⣵⢣⢏⡵⣺⡜⣧⢫⡿⣜⣧⡠⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡿⢧⣛⢮⠳⣌⡳⡞⡼⢣⡝⡶⣏⠷⣹⢾⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣹⢷⣫⢞⡽⢣⡝⡼⣱⢗⢯⢳⠭⣾⢏⡏⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⠜⠀⢻⣬⢷⡼⣳⣾⡽⣷⣻⣞⣥⢿⡹⠞⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠃⠀⠀⠀⠹⠳⣻⣿⣽⣿⡽⣟⢮⡝⠮⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⠀⠀⠀⣀⠠⠔⠊⢻⡟⠙⠊⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠐⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

`;

const terminal_text = 'Rhodless@dev$';

const TerminalContainer = styled.div`
  color: green;
  display: flex;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
`;

const TerminalText = styled.span`
  color: white;
`;

const CommandPrompt = styled.span`
  color: red;
`;

const WelcomeText = styled.div`
  color: lightcoral;
`;

const CommandOutput = styled.div`
  color: lightgray;
`;

const HistoryItem = styled.div`
  display: flex;
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`;

const ASCIIArt = styled.pre`
    margin: 0;
`;

const BigASCII = styled.code`
    font-size: 1rem;
`;

const SmallText = styled.code`
    font-size: 3rem;
    font-family: 'ascii';
`;

const Terminal: React.FC = () => {
    const [showUnderscore, setShowUnderscore] = useState(true);
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<Array<{ prompt: string, cmd: string }>>([]);
    const messagesEndRef = useRef<null | HTMLDivElement>(null); 

    useEffect(() => {
        const interval = setInterval(() => {
            setShowUnderscore(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (command.length == 0)
                    return;
                handleCommand(command);
                setCommand('');
            } else if (event.key === 'Backspace') {
                setCommand(prev => prev.slice(0, -1));
            } else if (event.key.length === 1) {
                setCommand(prev => prev + event.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [command]);

    const handleCommand = (cmd: string) => {
        if (cmd === 'clear') {
            setHistory([]);
        } else if (cmd === 'help') {
            setHistory(prev => [
                ...prev,
                { prompt: terminal_text, cmd },
                {
                    prompt: '', cmd: "Available commands: \n" +
                        " - help > The page you are currently on" + "\n" +
                        " - clear > Clear the command history" + "\n" +
                        " - portfolio > Show the portfolio" + "\n" +
                        " - contact > How to contact me" + "\n" +
                        "\n"
                }
            ]);
        } else if (cmd === 'portfolio') {
            setHistory(prev => [
                ...prev,
                { prompt: terminal_text, cmd },
                { prompt: '', cmd: "The website is under construction!\n\n" }
            ]);
        } else if (cmd === 'contact') {
            setHistory(prev => [
                ...prev,
                { prompt: terminal_text, cmd },
                {
                    prompt: '', cmd: "Feel free to contact me! \n" +
                        " - Discord: @rhodless" + "\n" +
                        " - Twitter: @Rhodless" + "\n" +
                        " - GitHub: https://github.com/Rhodless" + "\n" +
                        "\n"
                }
            ]);
        } else {
            setHistory(prev => [
                ...prev,
                { prompt: terminal_text, cmd },
                { prompt: '', cmd: "Unknown command, try 'help'\n\n" }
            ]);
        }
    };

    return (
        <>
        <TerminalContainer>
            <pre>
                <code>
                    <WelcomeText>
                        <FlexBox>
                            <ASCIIArt><BigASCII>{welcome_ascii}</BigASCII></ASCIIArt>
                            <ASCIIArt><SmallText>RHODLESS.DEV</SmallText></ASCIIArt>
                        </FlexBox>
                        Welcome to Rhodless.dev
                    </WelcomeText>
                    <TerminalText>Type 'help' for a list of commands.</TerminalText>
                    <br />
                    <br />
                    <br />
                    {history.map((item, index) => (
                        <HistoryItem key={index}>
                            {item.prompt && <CommandPrompt>{item.prompt} </CommandPrompt>}
                            <CommandOutput>{item.cmd}</CommandOutput>
                        </HistoryItem>
                    ))}
                    <HistoryItem>
                        <CommandPrompt>{terminal_text} </CommandPrompt> <TerminalText>{command}{showUnderscore ? '_' : ' '}</TerminalText>
                    </HistoryItem>
                </code>
                <div ref={messagesEndRef} />
            </pre>
        </TerminalContainer>
        </>
    );
};

export default Terminal;
