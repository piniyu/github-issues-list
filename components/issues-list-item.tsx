import { Flex, Link, Tag } from '@chakra-ui/react'
import { Endpoints } from '@octokit/types'

enum COLOR_SCHEME {
  open = 'red',
  in_progress = 'blue',
  done = 'green',
}

export default function IssuesListItem({
  data,
  isItemLoaded,
  repoName,
  owner,
}: {
  data: Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][]
  isItemLoaded: (index: number) => boolean
  repoName: string
  owner: string
}) {
  let flatData = data?.flat()

  /** infinity loader item function to render per item */
  const Item = ({ index, style }: { index: number; style: any }) => {
    let content
    let labels
    let issueNum
    if (!isItemLoaded(index)) {
      content = 'Loading...'
    } else {
      content = flatData ? flatData[index].title : null
      labels = flatData ? flatData[index].labels : null
      issueNum = flatData ? flatData[index].number : null
    }
    return (
      <Flex
        style={style}
        borderBottom="1px"
        borderColor="gray.200"
        align="center"
        gap="4"
      >
        {content !== 'Loading...' ? (
          <Link href={`/repo/${owner}/${repoName}/${issueNum}`}>{content}</Link>
        ) : (
          content
        )}
        {labels?.map(label => {
          let tagKey
          let tagValue = ''
          let colorScheme = 'gray'
          if (typeof label === 'string') {
            tagKey = label
            tagValue = label
          } else {
            tagKey = label.id
            tagValue = label.name ?? ''
            colorScheme
          }
          return (
            <Tag
              key={tagKey}
              borderRadius="full"
              variant="solid"
              colorScheme={
                COLOR_SCHEME[
                  tagValue.replaceAll(' ', '_') as keyof typeof COLOR_SCHEME
                ]
              }
            >
              {tagValue}
            </Tag>
          )
        })}
      </Flex>
    )
  }
  return Item
}
