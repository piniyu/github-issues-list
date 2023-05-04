'use client'
import { useState } from 'react'
import { Box, CardBody, VStack } from '@chakra-ui/react'
import IssuesListFilter from '~/components/issues-list-filter'
import IssuesList from '~/components/issues-list'

export default function RepoPage({
  params,
}: {
  params: { repoName: string; owner: string }
}) {
  const [issueState, setIssueState] = useState('all')

  return (
    <CardBody>
      <VStack align="stretch" spacing="6">
        <Box>
          <IssuesListFilter state={issueState} setState={setIssueState} />
        </Box>
        <IssuesList
          repoName={params.repoName}
          owner={params.owner}
          issueState={issueState}
        />
      </VStack>
    </CardBody>
  )
}
