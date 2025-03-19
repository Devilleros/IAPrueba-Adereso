
const Button = ({
    children , 
    onClick
}: {
    children : React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
})=>{
    const buttonStyle = {
        padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    }
    return <button style={buttonStyle} onClick={onClick}>{children}</button>
}

export default Button;