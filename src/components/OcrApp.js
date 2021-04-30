import React, { useState, useRef } from "react";
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
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
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
import "react-toastify/dist/ReactToastify.css";

function OcrApp() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const [file, setFile] = useState(null);
  const [ocr, setOcr] = useState("");
  const [lang, setLang] = useState("eng");
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
        data: { text },
      } = await worker.recognize(file);
      setOcr(text);
    } catch {
      return toast({
        position: "top",
        title: "There a error",
        status: "error",
        duration: 9000,
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
  const copyIt = () => {
    navigator.clipboard.writeText(ocr);
    toast({
      position: "top",
      title: "Copied",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

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

            <DrawerBody>
              <Text color={useColorModeValue("gray")}>{currentUser && currentUser.email}</Text>
              <Stack mt={10} spacing={2}>
                <Skeleton height="30px" />
                <Skeleton height="30px" />
                <Skeleton height="30px" />
              </Stack>
              <Stack mt={5} spacing={2}>
                <Skeleton height="30px" />
                <Skeleton height="30px" />
                <Skeleton height="30px" />
              </Stack>
              <Stack mt={5} spacing={2}>
                <Skeleton height="30px" />
                <Skeleton height="30px" />
                <Skeleton height="30px" />
              </Stack>
              <Stack mt={5} spacing={2}>
                <Skeleton height="30px" />
                <Skeleton height="30px" />
                <Skeleton height="30px" />
              </Stack>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Container maxW="85%" as={Flex} direction="row" h="lg" w="100%">
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
          bg={useColorModeValue("white", "black")}
        >
          <Box
            onClick={handleOnClick}
            cursor="pointer"
            boxShadow="dark-lg"
            as={Circle}
            position="absolute"
            top="200px"
            right="-70px"
            size="90px"
            bg={useColorModeValue("gray.900", "gray.700")}
            color="white"
            zIndex="4"
          >
            <Icon fontSize="40px" as={MdCheck} />
          </Box>
          <Center mt={2}>
            <Box>
              <Input
                h="50px"
                ref={fileRef}
                type="file"
                variant="ghost"
                accept=".bmp,.jpg,.png,.pbm"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Box>
          </Center>
          <Box as={Center} w="100%" h="300px">
            <Image
              p={2}
              maxW="100%"
              maxH="80%"
              src={file ? URL.createObjectURL(file) : null}
              alt={file ? file.name : null}
            ></Image>
          </Box>

          <Spacer />

          <Progress
            m={2}
            colorScheme="gray"
            size="lg"
            borderRadius="50px"
            value={progress}
          />

          <Box
            as={Center}
            boxShadow="dark-lg"
            borderRadius="15px"
            w="100%"
            h="80px"
            bg={useColorModeValue("gray.900", "gray.700")}
          >
            <RadioGroup
              defaultValue="eng"
              color={useColorModeValue("white")}
              w="100%"
            >
              <Flex direction="row">
                <Radio
                  justifyContent="center"
                  colorScheme="green"
                  w="33.3333%"
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
          </Box>
        </Flex>

        <Flex
          py="2"
          px={{
            md: "2",
          }}
          boxShadow="dark-lg"
          borderRadius="20px"
          w="100%"
          bg={useColorModeValue("white", "black")}
          position="relative"
        >
          <Box w="100%" overflowY="scroll">
            <Text p={4}>{ocr}</Text>
          </Box>

          <Box
            onClick={handleDownload}
            cursor="pointer"
            boxShadow="dark-lg"
            as={Circle}
            position="absolute"
            bottom="5px"
            right="-60px"
            size="50px"
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
            bottom="80px"
            right="-60px"
            size="50px"
            bg={useColorModeValue("gray.900", "gray.700")}
            color="white"
          >
            <Icon fontSize="20px" as={MdContentCopy} />
          </Box>

          {currentUser && (
            <Box
              onClick={onOpen}
              ref={btnRef}
              cursor="pointer"
              boxShadow="dark-lg"
              as={Circle}
              position="absolute"
              bottom="155px"
              right="-60px"
              size="50px"
              bg={bgColor}
              color="white"
            >
              <Icon fontSize="20px" as={MdHistory} />
            </Box>
          )}
        </Flex>
      </Container>
    </>
  );
}

export default OcrApp;
