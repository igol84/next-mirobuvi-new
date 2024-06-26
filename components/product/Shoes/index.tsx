'use client'
import React, {useContext, useState} from 'react';
import {Box, Flex, HStack, IconButton, Text} from "@chakra-ui/react";
import {ShoesType} from "@/components/product/types";
import Size from "@/components/product/Shoes/Size";
import AddToCartButton from "@/components/product/AddToCartButton";
import dynamic from "next/dynamic";
import {IsAdminContext, IsEditorContext} from "@/app/providers";
import PriceEditor from "@/components/product/PriceEditor";
import {EditIcon} from "@chakra-ui/icons";
import SizesEditForm from "@/components/product/Shoes/SizesEditForm";
import {SizeType} from "@/components/product/admin/shoes/types";
import {useTranslations} from "next-intl";
import Price from "@/components/product/Price";
import GroupOfLikeProducts from "@/components/product/GroupOfLikeProducts";

const Like = dynamic(() => import('@/components/product/Like'), {ssr: false})

type Props = {
  shoesData: ShoesType
}

const Shoes = ({shoesData}: Props) => {
  const t = useTranslations()
  const isAdmin = useContext(IsAdminContext)
  const isEditor = useContext(IsEditorContext)
  const isEditAccess = isAdmin || isEditor
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [sizeDesc, setSizeDesc] = useState<string>(t('shoes.select_size'))
  const [editMode, setEditMode] = useState<null | 'price' | 'sizes'>(null)
  const textLength = t('shoes.insole_length')
  const textSelect = t('shoes.select_size')
  const textNotAvailable = t('product.notAvailable')
  const textSizes = t('shoes.sizes')

  const changeLengthText = (length: number | null) => {
    const lengthText = length ? `${textLength} ${length}cm` : ''
    setSizeDesc(lengthText)
  }
  const onClickSize = (size: number, length: number | null) => {
    setSelectedSize(size)
    changeLengthText(length)
  }
  const onHoverSize = (hoveredSize: number) => {
    const sizeData = shoesData.sizes.find(size => size.size === hoveredSize)
    if (sizeData && sizeData.length)
      changeLengthText(sizeData.length)
  }
  const onLiveSize = () => {
    if (selectedSize) {
      const sizeData = shoesData.sizes.find(size => size.size === selectedSize)
      if (sizeData)
        changeLengthText(sizeData.length)
    } else
      setSizeDesc(textSelect)
  }
  const inStock = shoesData.inStock && !!shoesData.sizes.filter(size => size.inStock).length
  const isPriceEditMod = editMode === 'price'
  const isSizesEditMod = editMode === 'sizes'

  const onPriceClick = isEditAccess
    ? () => {
      setEditMode('price')
    } : () => undefined

  const onSizesEditClick = isEditAccess
    ? () => {
      setEditMode('sizes')
    } : () => undefined

  const onStopEdit = () => {
    setEditMode(null)
  }
  const defaultSizes: SizeType[] = shoesData.sizes.map(size => ({
    size: size.size, isAvailable: size.inStock, length: size.length!
  }))
  const defaultPrice = shoesData.defaultPrice
  return (
    <>
      <Text fontSize={36}>
        {shoesData.name}
      </Text>
      {isPriceEditMod && <PriceEditor id={shoesData.id} defaultPrice={defaultPrice} onClose={onStopEdit}
                                      defaultDiscount={shoesData.discount}/>}
      <Flex wrap='wrap' alignItems='center' justifyContent='space-between' hidden={editMode === 'price'}>
        <HStack align='baseline' hidden={editMode === 'price'}
                onClick={onPriceClick} cursor={isEditAccess ? 'pointer' : 'default'}>
          {(shoesData.oldPrice && shoesData.oldPrice !== shoesData.price) &&
            <Price price={shoesData.oldPrice} prefix={shoesData.price_prefix} isOld/>}
          <Price price={shoesData.price} prefix={shoesData.price_prefix}/>
        </HStack>
        <Like productUrl={shoesData.url}/>
      </Flex>
      {isSizesEditMod && <SizesEditForm shoesId={shoesData.id} defaultSizes={defaultSizes} onClose={onStopEdit}/>}
      {isEditAccess && !isSizesEditMod && (
        <IconButton aria-label='Edit' fontSize='20px' icon={<EditIcon/>} onClick={onSizesEditClick}/>
      )}
      <Flex gap={2} hidden={isSizesEditMod}>

        {inStock ? (
          <Box>
            <Flex gap={2} alignItems='center' wrap='wrap' pb={4}>
              <Text>{textSizes}</Text>
              {shoesData.sizes.map(sizeData => {
                const selected = selectedSize === sizeData.size
                return (
                  <Size
                    key={sizeData.size} sizeData={sizeData} selected={selected} onClickSize={onClickSize}
                    onHoverSize={onHoverSize} onLiveSize={onLiveSize}
                  />)
              })}
            </Flex>
            <Box color='secondary' pb={6}>{sizeDesc}</Box>
            <Box pb={6} color='secondary'>Відправляємо за передоплатою 150грн.</Box>
            <AddToCartButton productId={shoesData.url} size={selectedSize}/>
          </Box>
        ) : <Text color='red.400'>{textNotAvailable}</Text>}
      </Flex>
      <GroupOfLikeProducts products={shoesData.similarProducts}/>
    </>
  );
};

export default Shoes;