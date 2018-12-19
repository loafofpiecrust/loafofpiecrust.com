import {SkillMeter} from "components/skill-meter"
import { Row } from "styles/system/flex"
import Layout from "components/layout/layout"
import { PageHeader } from "components/layout/page-header"

export default props => <PageHeader title="About" header={<h2>Taylor Snead</h2>} {...props}/>

You know that feeling when you eat a slice of pie?
That feeling that maybe there's going to be delight at the end of the next bite?
That maybe you should just eat the crust by itself instead?

I am a software developer and university student residing in Boston, MA, USA. I spend most of my waking time building [stuff](/projects) and occasionally thinking up wild thoughts. Professionally, I've worked on various freelance projects for artists and art organizations. If you'd be interested in hiring me for a project, check out my [resume](/about/resume) or [LinkedIn](https://www.linkedin.com/in/snead-t/) or [GitHub](https://github.com/loafofpiecrust).

I want to find meaning in producing software that, rather than simply increasing laziness and ignorance, expressedly looks for new avenues of experience.

In my free time, I enjoy cooking and baking and crafting things from wood and fabric. I'm constantly [traveling](/about/places). Sometimes, I even like to [write](/stories).


### Language Proficiencies
<Row gap={15}>
  <SkillMeter title="English"
    color="seagreen"
    value={1}
    format={() => "Native"}
  />
  <SkillMeter title="Mandarin"
    color="firebrick"
    value={2/6}
    format={() => "HSK II"}
  />
</Row>


### Denominations
My | is
------------- | -----
Hometown | New Orleans, LA
Religion | Church of the Flying Spaghetti Monster
Snack Food | 包子
Pie Flavor | Ricotta (if you happen to be in New Orleans, eat at [my family's bakery](//shakesugary.com))
Diplomacy | [Polish Empire](https://upload.wikimedia.org/wikipedia/commons/7/77/LIVONIA_vulgo_Lyefland-Joan_Blaeu%2C_1662.jpg)
