import Link from 'next/link'

// Shared components for homepage (smaller, more compact)
export const mdxComponents = {
  h1: (props) => <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-tight" {...props} />,
  h2: (props) => <h2 className="text-xl font-semibold text-gray-900 mb-4" {...props} />,
  h3: (props) => <h3 className="text-lg font-medium text-gray-900 mb-3" {...props} />,
  p: (props) => <p className="text-gray-700 leading-relaxed mb-6" {...props} />,
  a: ({ href, ...props }) => (
    <Link
      href={href}
      className="text-purple-600 hover:text-purple-700 underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  pre: (props) => <pre className="overflow-auto mb-6 p-4 bg-gray-50 rounded-lg text-sm" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-700" {...props} />,
  li: (props) => <li className="pl-2" {...props} />,
  hr: (props) => <hr className="my-4 md:my-8" {...props} />,
  strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
  Test: <div />,
}

// Blog post components (larger, more spacious)
export const mdxComponentsBlog = {
  h1: (props) => (
    <h1
      className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
      {...props}
    />
  ),
  p: (props) => <p className="leading-7 mt-4 text-gray-700" {...props} />,
  a: ({ href, ...props }) => (
    <Link
      href={href}
      className="font-medium text-purple-600 hover:text-purple-700 underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-6 list-disc pl-6 space-y-3 text-gray-700" {...props} />,
  ol: (props) => <ol className="my-6 list-decimal pl-6 space-y-3 text-gray-700" {...props} />,
  li: (props) => <li className="pl-2" {...props} />,
  hr: (props) => <hr className="my-4 md:my-8" {...props} />,
  strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
  Test: <div />,
}