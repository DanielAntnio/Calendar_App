import { sendPasswordResetEmail } from "firebase/auth";
import { Envelope } from "phosphor-react";
import { useRef } from "react";
import { auth } from "../../firebase";

export function ForgetPassword() {
  const emailRef = useRef<HTMLInputElement>(null)

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    const emailInput = emailRef.current

    e.preventDefault()

    const verify = !emailInput || emailInput.value === ''
    if (verify) return alert("Digite seu Email!")
    sendPasswordResetEmail(auth, emailInput.value)
      .then(() => {
        alert('Emial enviado para ' + emailInput.value)
        window.location.pathname = '/login'
      })
      .catch(err => {
        if (err.code === 'auth/invalid-email') return alert('Email inválido')
        alert('algum erro ocorreu: ' + err.code)
      })
  }

  const aHerfStyle = `text-sm border-b-2 border-solid 
  text-slate-700 border-slate-700 hover:text-slate-500 hover:border-slate-500
  dark:text-slate-300 dark:border-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-200`

  return (
    <main className="flex flex-1 justify-center items-center h-full w-full bg-slate-200 dark:bg-gray-700 select-none">
      <div className="bg-slate-300 dark:bg-gray-800/50 text-black dark:text-gray-100 rounded-lg w-96 pb-8 m-8">
        <form onSubmit={sendEmail} className="flex flex-col justify-center items-center ">
          <h2 className="m-4 font-extrabold text-2xl" >Redefinir senha</h2>
          <div className="border-b-2 border-solid border-gray-400 mb-4 h-8 w-64 rounded-sm flex flex-row items-center">
            <Envelope size={24} className="ml-1" />
            <input
              type="email"
              className="bg-transparent h-8 outline-none placeholder:text-slate-500/95"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className="bg-slate-400/95 dark:bg-slate-800/80 hover:bg-slate-500 dark:hover:bg-slate-900/80 mb-4 h-8 w-64 rounded-sm flex flex-row items-center">
            <button
              title="Enviar Email"
              type="submit"
              className="bg-transparent cursor-pointer h-8 w-64 outline-none placeholder:text-slate-500/95"
            >
              Enviar Email
            </button>
          </div>
          <div className="flex flex-row items-center mt-4">
            <a href='./login' className={aHerfStyle}>
              Esqueceu sua Senha?
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}