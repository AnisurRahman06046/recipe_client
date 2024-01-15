import Form from '@/components/Form'


function CreateRecipe() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
       
              <div className="text-3xl font-bold mb-6">Create Recipe</div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Form />
      </div>
    </section>
  )
}

export default CreateRecipe