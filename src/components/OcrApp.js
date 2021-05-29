import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Input,
  Container,
  Spacer,
  Image,
  Flex,
  Progress,
  RadioGroup,
  Radio,
  Center,
  Circle,
  Icon,
  useToast,
  Heading,
  Stack,
  Skeleton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Select,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import {
  MdCheck,
  MdFileDownload,
  MdContentCopy,
  MdHistory,
} from "react-icons/md";
import { createWorker } from "tesseract.js";
import { jsPDF } from "jspdf";
import { useAuth } from "../contexts/AuthContext";
import { useColorModeValue } from "@chakra-ui/react";
import { database } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function OcrApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [file, setFile] = useState(null);
  const [ocr, setOcr] = useState("");
  const [lang, setLang] = useState("eng");
  const [fdata, setFdata] = useState([]);
  const [isOpenpop, setIsOpen] = useState(false);
  const [selectLng, setSelectLng] = useState(false);
  const close = () => setIsOpen(false);
  const closelng = () => setSelectLng(false);
  const some = useColorModeValue("gray", "black")
  const some2 = useColorModeValue("gray.900", "gray")
  const some3 = useColorModeValue("black", "white")
  


  const toast = useToast();
  const [progress, setProgress] = useState("0");
  const fileRef = useRef();
  const { currentUser } = useAuth();

  const bgColor = useColorModeValue("gray.900", "gray.700");

  const worker = createWorker({
    logger: (m) => setProgress(m.progress * 100),
  });

  const doOCR = async () => {
    try {
      await worker.load();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);
      const {
        /*  */ data: { text },
      } = await worker.recognize(file);
      setOcr(text);
    } catch {
      return toast({
        position: "top",
        title: "There a error",
        status: "error",
        isClosable: true,
      });
    }
  };
  const handleOnClick = (e) => {
    e.preventDefault();

    if (file === null) {
      return toast({
        position: "top",
        title: "Please Select A File",
        status: "error",
        duration: 9000,

        isClosable: true,
      });
    }
    doOCR();
  };

  useEffect(() => {
    if (currentUser == null  ) {
      return;
    } else {
      const updateRef = database.ocrdata.doc(currentUser.email);
      updateRef.onSnapshot((doc) => {
        
       if(doc.data().userocrData == null){
        return
       }else{
        setFdata(Object.values(doc.data().userocrData));
       }
       
        // console.log("Current data: ", Object.values(doc.data().userocrData));
      }
      
      );
    }
  }, []);

  useEffect(() => {
    if (file !== null) {
      setSelectLng(!selectLng);
    } else {
      return;
    }
  }, [file]);

  useEffect(() => {
    if (currentUser == null) {
      return;
    }
    if (ocr !== "") {
      console.log("done");
      const updateRef = database.ocrdata.doc(currentUser.email);
      updateRef
        .update({
          userocrData: firebase.firestore.FieldValue.arrayUnion(ocr),
        })
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      setIsOpen(!isOpenpop);
    }
  }, [ocr, currentUser, database]);

  // const userocrData =  fdata.length ?  (
  //   Object.values(fdata).map((data ,i) => {
  //     return(

  //     )
  //   })
  // ) : (<Heading> None Data </Heading>)

  const copyIt = () => {
    navigator.clipboard.writeText(ocr);
    return toast({
      position: "top",
      title: "Copied",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // function ReadtocrData() {
  //   var updateArrayRef = database.ocrdata.doc(currentUser.email);
  //   updateArrayRef.update({
  //     ocrdata:firebase.firestore.FieldValue.arrayUnion(ocr)
  //   })
  //   .then((docRef) => {
  //     console.log(docRef);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });
  // }

  const handlecopytoClip = () => {
    if (ocr === "") {
      return toast({
        position: "top",
        title: "Nothing to Copy",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      return copyIt();
    }
  };
  const downloadIt = () => {
    const doc = new jsPDF();
    doc.text(ocr, 20, 20);
    doc.save("OCR-APP_Result.pdf");

    toast({
      position: "top",
      title: "Downloaded",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  const handleDownload = () => {
    if (ocr === "") {
      return toast({
        position: "top",
        title: "Nothing to Download",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      return downloadIt();
    }
  };


  const hnadleClickPastOcr = () =>{

    setOcr()

  }


  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Heading>History</Heading>{" "}
            </DrawerHeader>

            <DrawerBody
             css={{
              "&::-webkit-scrollbar": {
                backgroundColor: some,
                borderRadius: "10px",
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                shadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                backgroundColor: some2,
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                shadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                backgroundColor: some3,
              },
            }}
            >
              <Text color={useColorModeValue("gray")} mb="10px">
                {currentUser && currentUser.email}
              </Text>

              <Flex
              
              flexDirection="column-reverse"
              >
                
              {fdata &&
                fdata.length > 0 &&
                fdata.map((d, i) => (
                  <Box
                    h="120px"
                    p={2}
                    cursor="pointer"
                    borderRadius="10px"
                    fontSize="14px"
                    boxShadow="lg"
                    border="lightgray solid 1px"
                    overflowY="auto"
                    mb="20px"
                    key={i}
                    css={{
                      "&::-webkit-scrollbar": {
                        backgroundColor: some,
                        borderRadius: "10px",
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        shadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                        borderRadius: "10px",
                        backgroundColor: some2,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        borderRadius: "10px",
                        shadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                        backgroundColor:some3,
                      },
                    }}
                  >
                    {" "}
                    <Text key={i} color="useColorModeValue('white','black')">
                      {d}
                    </Text>
                  </Box>
                ))}

              </Flex>

            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Container
        maxW={{ base: "90%", md: "85%" }}
        direction={{ base: "column", md: "row" }}
        as={Flex}
        h={{ base: "300px", md: "500px" }}
      >
        <Flex
          direction="column"
          py="2"
          px={{
            md: "2",
          }}
          position="relative"
          boxShadow="dark-lg"
          borderRadius="20px"
          w="100%"
          mr="50px"
          mb="10px"
          bg={useColorModeValue("white", "black")}
        >
          <Box
            onClick={handleOnClick}
            cursor="pointer"
            boxShadow="dark-lg"
            as={Circle}
            position="absolute"
            top={{ md: "200px" }}
            right={{ base: "18px", md: "-70px" }}
            size={{ base: "45px", md: "90px" }}
            bottom={{ base: "2.5" }}
            bg={useColorModeValue("gray.900", "gray.700")}
            color="white"
            zIndex="4"
          >
            <Icon fontSize={{ base: "25px", md: "40px" }} as={MdCheck} />
          </Box>
          <Center mt={1}>
            <Box>
              <Input
                fontSize={{ base: "10px", md: "15px" }}
                ref={fileRef}
                type="file"
                variant="ghost"
                accept=".bmp,.jpg,.png,.pbm"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Box>
          </Center>
          <Box as={Center} w="100%" h={{ base: "160px", md: "300px" }}>
            <Image
              p={2}
              maxH={{ base: "60%", md: "80%" }}
              src={file ? URL.createObjectURL(file) : null}
              alt={file ? file.name : null}
            ></Image>
          </Box>

          <Spacer />

          <Progress
            m={2}
            colorScheme="blue"
            size="lg"
            borderRadius="50px"
            value={progress}
          />

          <Box
            as={Center}
            boxShadow="dark-lg"
            borderRadius="15px"
            w={{ base: "70%", md: "100%" }}
            h={{ base: "50px", md: "80px" }}
            ml={{ base: "10px", md: "0px" }}
            bg={useColorModeValue("gray.900", "gray.700")}
          >
            <Box
              visibility={{ base: "visible", md: "hidden" }}
              color={useColorModeValue("white", "white")}
            >
              <Select
                variant="unstyled"
                placeholder="Select option"
                color={useColorModeValue("white", "white")}
                w={{ base: "200px", md: "0px" }}
                onChange={(e) => setLang(e.target.value)}
              >
                <option
                  visibility={{ base: "visible", md: "hidden" }}
                  value="hin"
                >
                  Hindi
                </option>
                <option
                  selected="selected"
                  visibility={{ base: "visible", md: "hidden" }}
                  value="eng"
                  defaultValue
                >
                  English
                </option>
                <option
                  visibility={{ base: "visible", md: "hidden" }}
                  value="mar"
                >
                  Marathi
                </option>
              </Select>
            </Box>

            <Popover
              returnFocusOnClose={false}
              isOpen={selectLng}
              onClose={closelng}
              placement="auto-start"
              closeOnBlur={true}
              preventOverflow={true}
              visibility={{ base: "hidden", md: "visible" }}
            >
              <PopoverTrigger>
                <RadioGroup
                  defaultValue="eng"
                  color={useColorModeValue("white")}
                  w={{ base: "0", md: "100%" }}
                  visibility={{ base: "hidden", md: "visible" }}
                >
                  <Flex direction={{ md: "row" }}>
                    <Radio
                      justifyContent="center"
                      colorScheme="green"
                      w={{ base: "0%", md: "33.3333%" }}
                      value="eng"
                      onChange={(e) => setLang(e.target.value)}
                    >
                      English
                    </Radio>
                    <Radio
                      w="33.3333%"
                      colorScheme="green"
                      justifyContent="center"
                      value="hin"
                      onChange={(e) => setLang(e.target.value)}
                    >
                      Hindi
                    </Radio>
                    <Radio
                      w="33.3333%"
                      justifyContent="center"
                      colorScheme="green"
                      value="mar"
                      onChange={(e) => setLang(e.target.value)}
                    >
                      Marathi
                    </Radio>
                  </Flex>
                </RadioGroup>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Hey {currentUser && currentUser.email}
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Select the Language that File cantains!
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>

        <Flex
          py="2"
          px={{
            md: "2",
          }}
          w="100%"
          boxShadow="dark-lg"
          borderRadius="20px"
          bg={useColorModeValue("white", "black")}
          position="relative"
        >
          <Box
            h={{ base: "250px", md: "480px" }}
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                backgroundColor: useColorModeValue("gray", "black"),
                borderRadius: "10px",
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                shadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                backgroundColor: useColorModeValue("gray.900", "gray"),
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                shadow: "inset 0 0 6px rgba(0,0,0,0.3)",
                backgroundColor: useColorModeValue("black", "white"),
              },
            }}
          >
            <Text fontSize={{ base: "13px", md: "18px" }} p={4}>
              {ocr}
            </Text>
          </Box>

          <Box
            onClick={handleDownload}
            cursor="pointer"
            boxShadow="dark-lg"
            as={Circle}
            position="absolute"
            bottom={{ base: "-50px", md: "5px" }}
            right={{ base: "60px", md: "-60px" }}
            size={{ base: "45px", md: "50px" }}
            bg={useColorModeValue("gray.900", "gray.700")}
            color="white"
          >
            <Icon fontSize="25px" as={MdFileDownload} />
          </Box>
          <Box
            onClick={handlecopytoClip}
            cursor="pointer"
            boxShadow="dark-lg"
            as={Circle}
            position="absolute"
            bottom={{ base: "-50px", md: "80px" }}
            right={{ base: "0px", md: "-60px" }}
            size={{ base: "45px", md: "50px" }}
            bg={useColorModeValue("gray.900", "gray.700")}
            color="white"
          >
            <Icon fontSize="20px" as={MdContentCopy} />
          </Box>

          {currentUser && (
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpenpop}
              onClose={close}
              placement="auto-end"
              closeOnBlur={false}
              preventOverflow={true}
              visibility={{ base: "hidden", md: "visible" }}
            >
              <PopoverTrigger>
                <Box
                  onClick={onOpen}
                  ref={btnRef}
                  cursor="pointer"
                  boxShadow="dark-lg"
                  as={Circle}
                  position="absolute"
                  bottom={{ base: "-50px", md: "155px" }}
                  right={{ base: "120px", md: "-60px" }}
                  size={{ base: "45px", md: "50px" }}
                  bg={bgColor}
                  color="white"
                >
                  <Icon fontSize="20px" as={MdHistory} />
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight="semibold">
                  Hey {currentUser.email}
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Check your OCR History Here!</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </Container>
    </>
  );
}

export default OcrApp;
