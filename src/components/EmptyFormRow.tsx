import '../styles/Form.scss'

export default function EmptyFormRow() {
  return (
    <span className='form-row'>
      <input type='text' placeholder='' style={{ visibility: 'hidden' }} />
    </span>
  )
}
