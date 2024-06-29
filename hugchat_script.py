from hugchat import hugchat
from hugchat.login import Login
import template_2

# Log in to huggingface and grant authorization to huggingchat
def data(topic, num_slide,headers):
    EMAIL = ""
    PASSWD = ""
    cookie_path_dir = "./cookies/"  # NOTE: trailing slash (/) is required to avoid errors
    sign = Login(EMAIL, PASSWD)
    cookies = sign.login(cookie_dir_path=cookie_path_dir, save_cookies=True)

    # Create your ChatBot
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())  # or cookie_path="usercookies/<email>.json"

    # Change the prompt to generate a PowerPoint presentation slide structure
    prompt = f"""
    Generate a PowerPoint presentation on {topic} of {num_slide} slides and give content. Slide topics should include {headers}
    For each slides, provide 4 heading points in the format heading:content along with specific content for each point in 100 words.
    """

    # Web search
    query_result = chatbot.query(prompt, web_search=True)
    print(query_result)

    # Process the response to create structured data
    data = str(query_result)
    data = data.replace("#", "").replace("*", "")
    slides_data = data.split('Slide')
    
    # Parse slides data
    i = 1
    for slide in slides_data[1:]:
        a = slide.split('\n-', 1)
        print(a)
        a[1] = a[1].split('\n-')
        a[1]= [sublist for sublist in a[1] if sublist != ['']]
        l = []
        for point in a[1]:
            l.append(point.split(":"))
        a[1] = l
        slides_data[i] = a
        i += 1

    print("structure is ", slides_data)

    dct = {}
    a = 1
    b = 1
    dct['Topic'] = topic
    for i in slides_data[1:]:
        dct["Title " + str(b)] = i[0][4:]
        dct["Heading " + str(a)] = i[1][0][0]
        dct["Heading " + str(a + 1)] = i[1][1][0]
        dct["Heading " + str(a + 2)] = i[1][2][0]
        dct["Heading " + str(a + 3)] = i[1][3][0]
        dct["Content " + str(a)] = i[1][0][1]
        dct["Content " + str(a + 1)] = i[1][1][1]
        dct["Content " + str(a + 2)] = i[1][2][1]
        dct["Content " + str(a + 3)] = i[1][3][1]
        a += 4
        b += 1

    print(dct)
    return dct

# Retry mechanism with infinite retries
def generate_presentation_until_success(topic, num_slide,headers):
    while True:
        try:
            result = data(topic, num_slide,headers)
            if result:
                return result
        except Exception as e:
            print(f"An error occurred: {e}")
        print("Retrying...")

# Generate data and create the presentation

