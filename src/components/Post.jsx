import {Card,Avatar,Flex,Button, Anchor} from "antd"
import testProfilepic from "./test-profile-pic.jpg"

export function Post(){
    return (
        <Flex gap="middle" vertical align="center" style={{"marginBottom":"1vi"}}>
            <Card style={{"width":"100%","backgroundColor":"#081E20","border":"none","borderRadius":"20px"}}>
                <Flex gap="middle" align="center" style={{"marginBottom":"1vi"}}>
                    <Flex justify="flex-start" align="center" style={{"width":"70%"}}>
                        <Avatar src={testProfilepic} style={{"marginRight":"1vi","width":"15%","height":"15%"}}/>
                        <div style={{"color":"#FFFFFF"}}>
                            <h4>Billeshwar Kumar</h4>
                            <p>
                                Ml Enthusiast | Web Designer | Web Developer
                            </p>
                        </div>   
                    </Flex>

                    <Flex justify="flex-end" style={{"width":"30%"}}>
                        <Button>Follow</Button>
                    </Flex>  
                </Flex>

                <Flex style={{"marginBottom":"1vi"}}>
                    <p style={{"color":"#FFFFFF"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Flex>

                <Flex vertical>
                    <Flex gap="middle" align="flex-start" justify="flex-start" style={{"height":"50%","color":"#FFFFFF"}}>
                        <a href="https://www.google.com/">Link 1</a>
                        <a href="https://www.yahoo.com/">Link 2</a>
                        
                    </Flex>
                    <Flex gap="middle" align="flex-end" justify="flex-end" style={{"height":"50%"}}>
                        <Button>Share</Button>
                        <Button>Like</Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}