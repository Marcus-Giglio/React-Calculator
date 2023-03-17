import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [formula, setFormula] = useState<string>('');
  const [output, setOutput] = useState<string>('0');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;

    switch (value) {
      case 'AC':
        setFormula('');
        setOutput('0');
        break;
      case '=':
        if (!formula.includes('=')) {
          let result = '';
          try {
            if (formula.includes('⋅')) {
              try {
                result = String(eval(formula.replaceAll('⋅', '*')));
              } catch (error) {
                result = 'Error';
              }
            } else result = String(eval(formula));
          } catch (error) {
            result = 'Error';
          }
          setFormula(formula + '=' + result);
          setOutput(result);
        } else return null;
        break;
      case '+':
        if (formula.slice(-1) !== '+') {
          setFormula(formula + '+');
          setOutput('+');
        }
        if (formula.slice(-1) === '-') {
          setFormula('+');
        }
        if (formula.slice(-1) === '*') {
          setFormula('+');
        }
        if (formula.slice(-1) === '/') {
          setFormula('+');
        }
        if (formula.includes('=')) {
          setFormula(output + '+');
        }
        break;
      case '/':
        if (formula.slice(-1) !== '/') {
          setFormula(formula + '/');
          setOutput('/');
        }
        if (formula.slice(-1) === '-') {
          setFormula('/');
        }
        if (formula.slice(-1) === '*') {
          setFormula('/');
        }
        if (formula.slice(-1) === '+') {
          setFormula('/');
        }
        if (formula.includes('=')) {
          setFormula(output + '/');
        }
        break;
      case 'x':
        if (formula.slice(-1) !== '*') {
          setFormula(formula + '*');
          setOutput('x');
        }
        if (formula.slice(-1) === '-') {
          setFormula('*');
        }
        if (formula.slice(-1) === '/') {
          setFormula('*');
        }
        if (formula.slice(-1) === '+') {
          setFormula('*');
        }
        if (formula.includes('=')) {
          setFormula(output + '*');
        }
        break;
      case '‑':
        if (formula.slice(-1) !== '-') {
          setFormula(formula + '-');
          setOutput('‑');
        }
        if (formula.slice(-1) === '+') {
          setFormula('-');
        }
        if (formula.slice(-1) === '*') {
          setFormula('-');
        }
        if (formula.slice(-1) === '/') {
          setFormula('-');
        }
        if (formula.includes('=')) {
          setFormula(output + '-');
        }
        break;
      case '.':
        if (output.indexOf('.') === -1) {
          setFormula('0' + value);
          setOutput(output + value);
        } else return null;
        if (/[0-9]/.test(formula[formula.length - 1])) {
          setFormula(formula + value);
          setOutput(output + value);
        }
        break;
      default:
        if (output === '0') {
          setFormula(value);
          setOutput(value);
        } else if (formula.includes('=')) {
          setFormula(value);
          setOutput(value);
        } else {
          setFormula(formula + value);
          setOutput(output.replace(/[^0-9.]/g, '') + value);
        }
        break;
    }
  };

  useEffect(() => {
    if (formula.includes('*')) {
      setFormula(formula.replace('*', '⋅'));
    }
  }, [formula]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="calculator mx-auto">
              <div className="formulaScreen">{formula}</div>
              <div className="outputScreen">{output}</div>
              <div>
                <button
                  className="jumbo"
                  value="AC"
                  style={{ background: 'rgb(172, 57, 57)' }}
                  onClick={handleClick}
                >
                  AC
                </button>
                <button
                  value="/"
                  style={{ background: 'rgb(102, 102, 102)' }}
                  onClick={handleClick}
                >
                  /
                </button>
                <button
                  value="x"
                  style={{ background: 'rgb(102, 102, 102)' }}
                  onClick={handleClick}
                >
                  x
                </button>
                <button value="7" onClick={handleClick}>
                  7
                </button>
                <button value="8" onClick={handleClick}>
                  8
                </button>
                <button value="9" onClick={handleClick}>
                  9
                </button>
                <button
                  value="‑"
                  style={{ background: 'rgb(102, 102, 102)' }}
                  onClick={handleClick}
                >
                  ‑
                </button>
                <button value="4" onClick={handleClick}>
                  4
                </button>
                <button value="5" onClick={handleClick}>
                  5
                </button>
                <button value="6" onClick={handleClick}>
                  6
                </button>
                <button
                  value="+"
                  style={{ background: 'rgb(102, 102, 102)' }}
                  onClick={handleClick}
                >
                  +
                </button>
                <button value="1" onClick={handleClick}>
                  1
                </button>
                <button value="2" onClick={handleClick}>
                  2
                </button>
                <button value="3" onClick={handleClick}>
                  3
                </button>
                <button className="jumbo" value="0" onClick={handleClick}>
                  0
                </button>
                <button value="." onClick={handleClick}>
                  .
                </button>
                <button
                  value="="
                  style={{
                    background: 'rgb(0, 68, 102)',
                    position: 'absolute',
                    height: '130px',
                    bottom: '5px',
                  }}
                  onClick={handleClick}
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
