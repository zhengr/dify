'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import s from './index.module.css'
import type { File } from '@/models/datasets'
import { fetchFilePreview } from '@/service/common'

type IProps = {
  file?: File
  hidePreview: () => void
}

const FilePreview = ({
  file,
  hidePreview,
}: IProps) => {
  const { t } = useTranslation()
  const [previewContent, setPreviewContent] = useState('')
  const [loading, setLoading] = useState(true)

  const getPreviewContent = async (fileID: string) => {
    try {
      const res = await fetchFilePreview({ fileID })
      setPreviewContent(res.content)
      setLoading(false)
    }
    catch {}
  }

  const getFileName = (currentFile?: File) => {
    if (!currentFile)
      return ''

    const arr = currentFile.name.split('.')
    return arr.slice(0, -1).join()
  }

  useEffect(() => {
    if (file)
      getPreviewContent(file.id)
  }, [file])

  return (
    <div className={cn(s.filePreview)}>
      <div className={cn(s.previewHeader)}>
        <div className={cn(s.title)}>
          <span>{t('datasetCreation.stepOne.filePreview')}</span>
          {false && (
            <div className='flex items-center justify-center w-6 h-6 cursor-pointer' onClick={hidePreview}></div>
          )}
        </div>
        <div className={cn(s.fileName)}>
          <span>{getFileName(file)}</span><span className={cn(s.filetype)}>.{file?.extension}</span>
        </div>
      </div>
      <div className={cn(s.previewContent)}>
        {loading && <div className={cn(s.loading)}/>}
        {!loading && (
          <div className={cn(s.fileContent)}>{previewContent}</div>
        )}
      </div>
    </div>
  )
}

export default FilePreview
