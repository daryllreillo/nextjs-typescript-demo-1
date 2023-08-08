import classes from './Button.module.css';

const Button: React.FC<{ type: 'submit' | 'button' | 'reset' | undefined; className: string; onClick?: () => void; children: React.ReactNode | string, disabled: boolean }> =
  function (props) {
    return (
      <button type={props.type} className={`${classes.button} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    );
  };

export default Button;
