import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome(ChromeDriverManager().install())  # Optional argument, if not specified will search path.
driver.get('http://localhost:4200/')
#time.sleep(5) # Let the user actually see something!
element = driver.find_element_by_name('alunos')
element.click()
time.sleep(1)
for i in range(11):
    element = driver.find_element_by_id('namebox')
    element.send_keys("a" + str(i))
    element = driver.find_element_by_id('cpfbox')
    element.send_keys(i)
    element = driver.find_element_by_id('emailbox')
    element.send_keys("a" + str(i))
    element = driver.find_element_by_id('githubbox')
    element.send_keys("a" + str(i))
    element = driver.find_element_by_id('criarAluno')
    element.click()
    time.sleep(1)


element = driver.find_element_by_name('monitores')
element.click()
time.sleep(1)
for i in range(3):
    element = driver.find_element_by_id('namebox')
    element.send_keys("b" + str(i))
    element = driver.find_element_by_id('cpfbox')
    element.send_keys(i)
    element = driver.find_element_by_id('emailbox')
    element.send_keys("b" + str(i))
    element = driver.find_element_by_id('githubbox')
    element.send_keys("b" + str(i))
    element = driver.find_element_by_id('criarMonitor')
    element.click()
    time.sleep(1)

driver.quit()

