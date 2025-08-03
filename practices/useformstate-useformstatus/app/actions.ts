'use server'

export type FormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
  }
}

export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get('name') as string
  const email = formData.get('email') as string

  const errors: FormState['errors'] = {}

  if (!name || name.length < 2) {
    errors.name = ['名前は2文字以上で入力してください']
  }

  if (!email || !email.includes('@')) {
    errors.email = ['有効なメールアドレスを入力してください']
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: 'エラーがあります',
      errors
    }
  }

  return {
    message: `送信成功: ${name} (${email})`
  }
}