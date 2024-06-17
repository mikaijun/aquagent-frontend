// https://github.com/shadcn-ui/ui/discussions/1694#discussioncomment-7851248
export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const LoadingSpinner = ({ size = 24, ...props }: ISVGProps) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  )
}
