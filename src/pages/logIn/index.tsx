import { Envelope, LockKey } from "phosphor-react";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRef } from "react";
import { auth } from "../../firebase";

export function LogIn() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
    const emailInput = emailRef.current
    const passwordInput = passwordRef.current

    e.preventDefault()

    const verify = !emailInput || emailInput.value === '' || !passwordInput || passwordInput.value === ''

    if (verify) return alert("preencha todos os campos!")
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => window.location.href = './')
      .catch((err) => {
        if (err.code === 'auth/user-not-found') return alert('Usuário não cadastrado.')
        if (err.code === 'auth/invalid-email' || err.code === 'auth/wrong-password') return alert('E-mail ou senha inválida.')
        alert('algum erro ocorreu: ' + err.code)
      });
  }

  const aHerfStyle = `text-sm border-b-2 border-solid 
  text-slate-700 border-slate-700 hover:text-slate-500 hover:border-slate-500
  dark:text-slate-300 dark:border-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-200`

  return (
    <main className="flex flex-1 justify-center items-center h-full w-full bg-slate-200 dark:bg-gray-700 select-none">
      <section className="bg-slate-300 dark:bg-gray-800/50 text-black dark:text-gray-100 w-96 pb-8 m-8 rounded-lg">
        <form onSubmit={handleLogIn} className="flex flex-col justify-center items-center ">
          <h2 className="m-4 font-extrabold text-2xl" >LogIn</h2>
          <div className="mb-4 h-8 w-64 rounded-sm flex flex-row items-center border-b-2 border-solid border-gray-400">
            <Envelope size={24} className="mx-1" />
            <input
              type="email"
              className="bg-transparent h-8 outline-none placeholder:text-slate-500/95"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4 h-8 w-64 rounded-sm flex flex-row items-center border-b-2 border-solid border-gray-400">
            <LockKey size={24} className="mx-1" />
            <input
              type="password"
              className="bg-transparent h-8 outline-none placeholder:text-slate-500/95"
              placeholder="Senha"
              autoComplete="password"
              ref={passwordRef}
            />
          </div>
          <div className="bg-slate-400/95 dark:bg-slate-800/80 hover:bg-slate-500 dark:hover:bg-slate-900/80 mb-4 h-8 w-64 rounded-sm flex flex-row items-center">
            <button
              title="Entrar"
              type="submit"
              className="bg-transparent cursor-pointer h-8 w-64 outline-none placeholder:text-slate-500/95"
            >
              Enviar
            </button>
          </div>
          <div className="flex flex-row items-center mt-4">
            <span className="text-gray-900 dark:text-gray-50 text-sm mr-1">
              Não possui logIn?
            </span>
            <a href="./signin" className={aHerfStyle}>
              Crie uma conta
            </a>
          </div>
          <div className="flex flex-row items-center mt-4">
            <a href='./fgtPss' className={aHerfStyle}>
              Esqueceu sua Senha?
            </a>
          </div>
        </form>
      </section>
    </main>
  )
}