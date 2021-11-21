import react from 'react'

const Noteitem = (props) => {
    const { note } = props
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
            <div className="d-flex align-items-center">
                <h5 className ="card-title">{note.title}</h5>
                <i className="far fa-trash-alt mx-2"></i>
                <i className="far fa-edit mx-2"></i>
                </div>
                <div className ="card-body">
                <p className ="card-text">{note.description}</p>
                
                </div>
            </div>
        </div>
    )

}
export default Noteitem