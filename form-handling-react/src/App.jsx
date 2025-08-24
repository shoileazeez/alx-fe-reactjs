import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikForm'
import './App.css'

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Form Handling in React</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <RegistrationForm />
        </div>
        
        <div style={{ flex: 1, minWidth: '300px' }}>
          <FormikForm />
        </div>
      </div>
    </div>
  )
}

export default App
