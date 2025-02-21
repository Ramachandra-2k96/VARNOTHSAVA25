"use client"

import React from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
import Image from "next/image"
import { useTypewriter, Cursor } from "react-simple-typewriter"

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    thumbnail: string
  }[]
}) => {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig)
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig)
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig)

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-black"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  const [text] = useTypewriter({
    words: ["A fusion of creativity, innovation, and passion!"],
    typeSpeed: 50,
    deleteSpeed: 50,
    loop: 1,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 text-center"
    >
      <motion.h1
        className="text-4xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text tracking-tight"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        VRANOTHSAVA 2K25
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 space-y-8"
      >
        <p className="text-lg md:text-2xl font-medium text-zinc-200">
          {text}
          <Cursor cursorStyle="_" />
        </p>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 backdrop-blur-sm border border-white/10"
            >
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">MARCH</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                    20
                  </span>
                  <span className="text-white text-2xl">-</span>
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
                    23
                  </span>
                </div>
                <p className="text-zinc-400 mt-2">2025</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base md:text-lg text-zinc-400"
          >
            at <span className="text-zinc-200 font-semibold"><a href="https://www.bing.com/maps?&ty=18&q=smvit%20bantakal&ss=ypid.YN4070x15793105497940586496&mb=13.264623~74.770964~13.245804~74.801327&description=Vishwothama%20Nagar%2C%20Bantakal%2C%20Udupi%2C%20Karnataka%20574115%C2%B7College%2Funiversity&cardbg=%2388979C&dt=1740151800000&tt=Shri%20Madhwa%20Vadiraja%20Institute%20of%20Technology%20and%20Management&tsts0=%2526ty%253D18%2526q%253Dsmvit%252520bantakal%2526ss%253Dypid.YN4070x15793105497940586496%2526mb%253D13.264623~74.770964~13.245804~74.801327%2526description%253DVishwothama%252520Nagar%25252C%252520Bantakal%25252C%252520Udupi%25252C%252520Karnataka%252520574115%2525C2%2525B7College%25252Funiversity%2526cardbg%253D%25252388979C%2526dt%253D1740151800000&tstt0=Shri%20Madhwa%20Vadiraja%20Institute%20of%20Technology%20and%20Management&cp=13.255214~74.780824&lvl=16&pi=0&ftst=0&ftics=False&v=2&sV=2&form=S00027">SMVITM</a></span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    thumbnail: string
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{
        y: -20,
        transition: { duration: 0.3 },
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0 rounded-xl overflow-hidden"
    >
      <Image
        src={product.thumbnail || "/placeholder.svg"}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-110"
        alt={product.title}
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover/product:translate-y-0 transition-transform duration-300">
        <h2 className="text-xl font-bold text-white mb-2">{product.title}</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </div>
    </motion.div>
  )
}

