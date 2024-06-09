'use server'

console.log('SECRET:', process.env.SECRET);
async function HelloWorld() {
  return <div>Hello, World!</div>;
}

export default HelloWorld;
