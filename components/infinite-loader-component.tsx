import { Container } from '@chakra-ui/react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

export default function InfiniteLoaderComoponent({
  isReachingEnd,
  totalItems,
  isLoading,
  loadMoreFn,
  item,
}: {
  isReachingEnd: boolean
  totalItems: number
  isLoading: boolean
  loadMoreFn: () => void
  item: typeof List['prototype']['props']['children']
}) {
  const itemCount = isReachingEnd ? totalItems : totalItems + 1
  const isItemLoaded = (index: number) => {
    return isReachingEnd || index < totalItems
  }

  const loadMoreItems = isLoading || isReachingEnd ? () => {} : loadMoreFn

  return (
    <div style={{ height: '100%', flex: '1 1 auto' }}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                width={width ?? '100%'}
                height={height ?? '100%'}
                itemCount={itemCount}
                itemSize={60}
                onItemsRendered={onItemsRendered}
                innerElementType={(props: any) => <Container {...props} />}
                ref={ref}
              >
                {item}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  )
}
