const TextArea = (props) => {
  const { title, lines, onChange } = props
  return (
    <div className='mb-3'>
      <label>{title}</label>
      <textarea
        rows={lines}
        onChange={onChange}
        style={{ resize: 'none' }}
        className='form-control'></textarea>
    </div>
  )
}

export default TextArea
