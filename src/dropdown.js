import { cloneElement, useState } from "react";
import './dropdown';

function DropdonwItem(){

    const handleMenuOne = () => {
        // setOpen(false);
        console.log('clicked male');
    }

    const handleMenuTwo = () => {
        // setOpen(false);
        console.log('clicked female');
    }

    return(
        <Dropdown
            trigger={<button>เลือก</button>}
            menu={[
                <button onClick={handleMenuOne}>ชาย</button>,
                <button onClick={handleMenuTwo}>หญิง</button>,
            ]}/>
    );
};

const Dropdown = ({trigger, menu}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(!open);
    }

    return (
        <div className="dropdown">
            {cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {open ? (
                <ul className="menu">
                    {menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">
                            {cloneElement(menuItem, {
                                onClick: () => {
                                    menuItem.props.onClick();
                                    setOpen(false);
                                }
                            })}
                        </li>
                    ))}
                </ul>
            ):null}
        </div>
    )
}

export default DropdonwItem;