// The soft room behind the objects in home sections 02 and 03 (28 Sep 2026):
// window light and a sill, well out of focus. A vector stand-in for the
// reference's photographed backdrop. Static and drawn once; the filter is
// applied to shapes that never move.
//
// 29 Sep: the leafy plants at each edge were removed on instruction.
//
// Each instance takes an `id` so its gradient and filter ids are unique on
// the page. Ids avoid pure hex spellings, which the token gate would read as
// colours.

export default function RoomBackdrop({ id }: { id: string }) {
  return (
    <svg
      className='roomBackdrop'
      viewBox='0 0 1440 520'
      preserveAspectRatio='xMidYMid slice'
      focusable='false'
      aria-hidden='true'
    >
      <defs>
        <linearGradient id={`${id}Ground`} x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0' className='room__stop--light' />
          <stop offset='0.45' className='room__stop--light' />
          <stop offset='1' className='room__stop--warm' />
        </linearGradient>
        <filter id={`${id}Far`} x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='22' />
        </filter>
      </defs>
      <rect width='1440' height='520' fill={`url(#${id}Ground)`} />
      <g filter={`url(#${id}Far)`}>
        <rect
          className='room__window'
          x='560'
          y='-40'
          width='240'
          height='330'
        />
        <rect
          className='room__window'
          x='840'
          y='-40'
          width='240'
          height='330'
        />
        <rect
          className='room__window'
          x='1120'
          y='-40'
          width='240'
          height='330'
        />
        <rect className='room__sill' x='520' y='440' width='940' height='120' />
      </g>
    </svg>
  );
}
