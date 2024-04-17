export default function TextTheme({title, subtitle}){
  return(
    <div className="text_theme">
      <p className='subtitle'>{subtitle}</p>
      <p className='title'>{title}</p>
    </div>
  )
}