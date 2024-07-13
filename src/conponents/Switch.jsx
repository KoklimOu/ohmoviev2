import './Switch.css';


function Switch({ isOn, handleToggle}) {

  return (
        
    <label className="switch" onChange={handleToggle}>
      <input type="checkbox" defaultChecked={isOn} />
      <span className="slider round"></span>
    </label>

  );
}

export default Switch;