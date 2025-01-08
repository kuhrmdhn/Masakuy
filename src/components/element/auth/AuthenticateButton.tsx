import { Button } from '@/components/ui/button'
import useLogin from '@/hooks/useLogin'
import { FilePen, LogIn, LogOut, Settings, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import NavigationItem from '../sidebar/NavigationItem'

export default function AuthenticateButton() {
    const { session } = useLogin()
    return (
        <div className='w-full h-full'>
            {
                session ?
                    <div className="flex flex-col gap-3">
                        <NavigationItem url="/profile" text='Profile' className='h-12' icon={<User />} />
                        <NavigationItem url="/profile/setting" text='Setting' className='h-12' icon={<Settings/>}/>
                        <Button type='button' className='h-12 w-full flex gap-3' variant={"ghost"} onClick={() => signOut()}>
                            <LogOut className='h-5 w-5' />
                            <span className='w-full h-full flex items-center'>
                                Sign Out
                            </span>
                        </Button>
                    </div>
                    :
                    <div className="flex flex-col gap-3">
                        <NavigationItem icon={<LogIn />} className='h-12' url="/signIn" text='SignIn' />
                        <NavigationItem icon={<FilePen />} className='h-12' url="/signUp" text='SIgnUp' />
                    </div>
            }
        </div>
    )
}
